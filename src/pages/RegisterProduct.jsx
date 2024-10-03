import { addDoc, collection, doc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { db, storage } from '../../config/firebaseConfig'
import Background from "../components/Background";
import Title from "../components/Title";

function RegisterProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [image, setImage] = useState('')
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)

  const navigate = useNavigate()

  const productCollectionRef = collection(db, 'products')
  let registeredProduct = {}

  const handleUpload = (event) => {
    event.preventDefault()
    const file = event.target[3]?.files[0]

    if (!file) return
    if (!file.type.includes('image')) return alert('Só é permitido imagens')
    if (file.size > 1024 * 1024 * 2) {
      alert(`A imagem não pode ser maior do que 2MB. Imagem selecionada tem: ${(file.size / 1024 / 1024).toFixed(3)} +  MB`)
      return
    }

    const imgName = createUniqueFileName(file)
    const storageRef = ref(storage, `${category}/${imgName}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

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
          setImage(url)
          setUploading(false)
          createProduct(url)
        })
      }
    )
  }

  const createUniqueFileName = (file) => {
    const uniqueID = doc(productCollectionRef).id
    const imgName = `${uniqueID} - ${file.name}`
    return imgName
  }

  async function createProduct(imageURL) {
    try {
      let productCollectionRef

      if(category === 'plants') {
        productCollectionRef = collection(db, 'plants')
      } else if(category === 'vases') {
        productCollectionRef = collection(db, 'vases')
      }  else {
        productCollectionRef = collection(db, 'other_products')
      }

      const product = await addDoc(productCollectionRef, {
        name,
        price,
        category,
        image: imageURL
      })
      registeredProduct = product
      console.log(image);
      resetInputs()
    } catch (error) {
      alert(error)
    }
  }

  function resetInputs() {
    const textInputs = document.querySelectorAll('input')
    textInputs[0].value = ''
    textInputs[1].value = ''
    textInputs[2].value = ''
    textInputs[3].value = ''
  }

  return (
    <div className='h-screen flex flex-col items-center bg-secondaryBackground'>
      <Background />
      <Title>Cadastre suas Plantas</Title>

      <form className='h-42. flex flex-col relative' onSubmit={handleUpload}>
        <label className='text-white mr-1' htmlFor="name">Nome:</label>
        <input className='text-black rounded-lg p-1' placeholder="Tulipas" type="text" name="name" value={name} required onChange={(e) => setName(e.target.value)} />

        <label className='text-white mr-2' htmlFor="price">Preço:</label>
        <input className='text-black rounded-lg p-1' placeholder="15" type="number" name="price" value={price} required onChange={(e) => setPrice(e.target.value)} />

        <label className='text-white mr-4' htmlFor="Category">Categoria:</label>
        <select
          className='text-black rounded-lg p-1'
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

        <label className='text-white mr-4' htmlFor="Image">Imagem:</label>
        <input className='text-black rounded-lg p-1' type="file" name='Image' accept='image/' required />

        <button className='btn-primary w-48 mx-20 mt-6' type="submit">Cadastrar</button>

        {!uploading ? '' : <progress className='progress-custom w-full absolute bottom-14' value={progress} max="100" />}
      </form>

      {registeredProduct.name ?
        <p>{registeredProduct.name ? `${registeredProduct.name} registrado com sucesso!` : 'Produto não foi registrado'}</p>
        : ''
      }
      <button className='btn-third' type="submit" onClick={() => navigate("/loja")}>Ir para a loja</button>
    </div>
  );
}

export default RegisterProduct;
