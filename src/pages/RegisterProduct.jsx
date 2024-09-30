import { addDoc, collection, getFirestore } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { app, storage } from '../../config/firebaseConfig'
import Background from "../components/Background";
import Title from "../components/Title";

function RegisterProduct() {
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('')
  const [imgURL, setImgURL] = useState('')
  const [progress, setProgress] = useState(0)

  const navigate = useNavigate()

  const db = getFirestore(app)
  const productCollectionRef = collection(db, 'products')
  let registeredProduct = {}

  async function createProduct() {
    const product = await addDoc(productCollectionRef, {
      name,
      price,
      category
    })
    registeredProduct = product
  }

  const handleUpload = (event) => {
    event.preventDefault()

    const file = event.target[3]?.files[0]
    if (!file) return

    const storageRef = ref(storage, `images/${file.name}`)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setProgress(progress)
      },
      error => {
        alert(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setImgURL(url)
        })
      }
    )
  }

  return (
    <div className='h-screen flex flex-col items-center bg-primaryBackground'>
      <Background />
      <Title>Cadastre suas Plantas</Title>
      <form className='h-42. flex flex-col relative' onSubmit={handleUpload}>

        <label className='text-white mr-1' htmlFor="name">Nome:</label>
        <input className='text-black rounded-lg p-1' placeholder="Tulipas" type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} />

        <label className='text-white mr-2' htmlFor="price">Preço:</label>
        <input className='text-black rounded-lg p-1' placeholder="15" type="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />

        <label className='text-white mr-4' htmlFor="Category">Categoria:</label>
        <input className='text-black rounded-lg p-1' placeholder="Plantas com Flores" type="text" name="Category" value={category} onChange={(e) => setCategory(e.target.value)} />

        <label className='text-white mr-4' htmlFor="Image">Imagem:</label>
        <input className='text-black rounded-lg p-1' type="file" name='Image' accept='image/' />
        <button className='btn-primary w-48 mx-20 mt-6' type="submit">Cadastrar</button>

        {!imgURL ? '' : <progress className='progress-custom w-full absolute bottom-14' value={progress} max="100" />}

      </form>
      {registeredProduct.name ?
        <p>{registeredProduct.name ? `${registeredProduct.name} registrado com sucesso!` : 'Produto não foi registrado'}</p>
        : ''
      }
      <button className='btn-secondary' type="button" onClick={() => navigate("/loja")}>Ir para a loja</button>
    </div>
  );
}

export default RegisterProduct;
