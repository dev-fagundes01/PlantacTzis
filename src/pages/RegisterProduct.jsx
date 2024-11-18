import { addDoc, collection, doc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from "react";
import { db, storage } from '../../config/firebaseConfig'
import Loading from '../assets/loading.gif'
import Background from "../components/Background";
import Title from "../components/Title";
import NavigationButtons from '../components/NavigationButtons';

function RegisterProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [confirmDivVisible, setConfirmDivVisible] = useState(false)
  const [confirmationData, setConfirmationData] = useState({})
  const [registeredProduct, setRegisteredProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const confirmProducts = (event) => {
    event.preventDefault()

    const formData = {
      name,
      price,
      category,
      imageName: image ? image.name : ''
    }
    setConfirmationData(formData)
    setConfirmDivVisible(true)
  }

  const handleUpload = () => {
    if (!image) return alert('Por favor, selecione uma imagem')
    if (!image.type.includes('image')) return alert('Só é permitido imagens')
    if (image.size > 1024 * 1024 * 2) {
      return alert(`A imagem não pode ser maior do que 2MB. Imagem selecionada tem: ${(file.size / 1024 / 1024).toFixed(3)} +  MB`)
    }

    const imgName = createUniqueFileName(image)
    const storageRef = ref(storage, `${category}/${imgName}`)
    const uploadTask = uploadBytesResumable(storageRef, image)

    setUploading(true)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      error => {
        alert(error)
        setUploading(false)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          createProduct(url)
        })
      }
    )
  }

  const createUniqueFileName = (file) => {
    const uniqueID = doc(collection(db, 'products')).id
    return `${uniqueID} - ${file.name}`
  }

  async function createProduct(imageURL) {
    setIsLoading(true)

    try {
      let productCollectionRef

      if (category === 'plants') {
        productCollectionRef = collection(db, 'plants')
      } else if (category === 'vases') {
        productCollectionRef = collection(db, 'vases')
      } else {
        productCollectionRef = collection(db, 'other_products')
      }

      const product = await addDoc(productCollectionRef, {
        name,
        price,
        category,
        image: imageURL,
        visibility: true,
      })

      setRegisteredProduct(product);
      resetInputs()
      setUploading(false)
      setIsLoading(false)
      setConfirmDivVisible(false)
    } catch (error) {
      alert(error)
    }
  }

  function resetInputs() {
    setName('')
    setPrice('')
    setCategory('')
    setImage('')

    setTimeout(() => {
      setRegisteredProduct(null)
    }, 4000);
  }

  return (
    <div className='h-screen p-4 bg-secondaryBackground flex flex-col overflow-y-auto md:items-center'>
      <Background />
      <Title>Cadastre suas Plantas</Title>
      <form className='w-fit mx-auto pb-2 flex flex-col relative' onSubmit={(e) => confirmProducts(e)}>
        <label className='label-c' htmlFor="name">Nome:</label>
        <input className='input-c' placeholder="Tulipas" type="text" name="name" required value={name} onChange={(e) => setName(e.target.value)} />

        <label className='label-c' htmlFor="price">Preço:</label>
        <input className='input-c' placeholder="15" type="number" name="price" required value={price} onChange={(e) => setPrice(e.target.value)} />

        {isLoading && <img className='w-12 h-12 mx-20 top-[2.75rem] absolute md:h-20 md:w-20 md:mx-[9.5rem] md:top-[3.5rem]' src={Loading} alt="Imagem de carregamento" />}

        <label className='label-c' htmlFor="Category">Categoria:</label>
        <select
          className='input-c'
          name="Category"
          value={category}
          required
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Selecione a categoria</option>
          <option value="plants">Plantas</option>
          <option value="vases">Vasos</option>
          <option value="other_products">Outros Produtos</option>
        </select>

        <label className='label-c' htmlFor="Image">Imagem:</label>
        <input className='input-c cursor-pointer' type="file" name='Image' accept='image/' required onChange={(e) => setImage(e.target.files[0])} />


        {!uploading ? '' : <progress className='progress-custom w-52 dm:h-2 md:w-96' value={progress} max="100" />}
        {registeredProduct &&
          <p className='p-c mb-0 text-center'>{registeredProduct.name} registrado com sucesso!</p>
        }

        <button className='btn-primary' type="submit">Cadastrar</button>
      </form>

      {confirmDivVisible && (
        <div className='h-screen w-11/12 fixed flex justify-center items-center'>
          <div className='p-4 rounded-lg bg-primaryBackground'>
            <h2 className='h2-c'>Verificar Dados do Produto</h2>
            <p className='text-xs md:text-sm'>Nome: {confirmationData.name}</p>
            <p className='text-xs md:text-sm'>Preço: R$ {confirmationData.price}</p>
            <p className='text-xs md:text-sm'>Categoria: {confirmationData.category}</p>
            <p className='text-xs md:text-sm'>Imagem: {confirmationData.imageName}</p>
            <div className='flex gap-2 justify-center'>
              <button className='btn-third mt-1 mx-0  px-1 py-0 text-xs md:text-sm md:leading-4' type="button" id="confirm-btn" onClick={(e) => handleUpload(e)}>
                Confirmar
              </button>
              <button className='btn-third mt-1 mx-0 px-1 py-0 text-xs md:text-sm md:leading-4' type="button" id="cancel-btn" onClick={() => setConfirmDivVisible(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <NavigationButtons register={true} />
    </div>
  );
}

export default RegisterProduct;
