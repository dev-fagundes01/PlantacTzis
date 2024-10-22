import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { FilePenLine, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { db, storage } from "../../config/firebaseConfig";
import cn from '../lib/utuls'

export default function Card({ produto, btn, admin, cursoGrab }) {
  const [divUpdate, setDivUpdate] = useState(false)
  const [produtoData, setProdutoData] = useState({})
  const numeroLoja = "5581991943001"

  const gerarLinkWhatsApp = (produto) => {
    const mensagem = `Olá, gostaria de comprar o produto: ${produto.name}, Preço: ${produto.price}`
    const url = `https://wa.me/${numeroLoja}?text=${encodeURIComponent(mensagem)}`
    return url
  }

  function confirmUpdate(produto) {
    setProdutoData(produto)
    setDivUpdate(true)
  }

  async function updateProduct(updatedData) {
    try {
      let imgURL = produtoData.image

      if (updatedData.image instanceof File) {
        imgURL = await uploadImage(updatedData)
      }

      const updatedProductData = {
        ...updatedData,
        image: imgURL
      }

      const productDocRef = doc(db, updatedData.category, updatedProductData.id);
      await updateDoc(productDocRef, updatedProductData);
      alert('Produto atualizado com sucesso!')
      setDivUpdate(false)
    } catch (error) {
      alert('Erro ao atualizar o produto')
      console.error('Erro ao atualizar o produto:', error);
    }
  }

  async function uploadImage(updatedData) {
    if (!updatedData.image) return null

    const storageRef = ref(storage, `${updatedData.category}/${updatedData.image.name}`)
    await uploadBytes(storageRef, updatedData.image)
    const imgURL = await getDownloadURL(storageRef)
    return imgURL
  }

  async function removeProduct(product) {
    try {
      removeImg(product)

      const productDocRef = doc(db, product.category, product.id);
      await deleteDoc(productDocRef)
      alert('Produto removido com sucesso!')
    } catch (error) {
      console.log(error);
      alert('Erro ao remover o produto')
    }
  }

  async function removeImg(product) {
    const imgRef = ref(storage, `${product.category}/${product.id}`)
    await deleteObject(imgRef)
  }

  return (
    <div className={cn('w-fit flex flex-col items-center', cursoGrab ? 'cursor-grab' : '')}>
      {produto?.image ? (
        <img className="img-c" src={produto.image} alt={produto.name} />) : (<p>Imagem não disponível</p>
      )}

      <h3 className="h3-c">{produto.name}</h3>
      <p className="p-c mb-2">Preço: R$ {produto.price},00</p>

      {btn &&
        <button type="button">
          <a
            href={gerarLinkWhatsApp(produto)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >Comprar</a>
        </button>
      }
      {admin &&
        <div>
          <button className='mr-2' type="button"><Trash2 onClick={() => removeProduct(produto)} /></button>
          <button type="button" onClick={() => confirmUpdate(produto)}><FilePenLine /></button>
        </div>
      }
      {divUpdate && (
        <div className='h-screen w-11/12 fixed top-0 right-0 flex justify-center items-center'>
          <div className='p-4 rounded-lg bg-primaryBackground flex flex-col'>
            <h2 className='h2-c'>Verificar Dados do Produto</h2>
            <input className='input-c' type="text" value={produtoData.name || ""} onChange={(e) => setProdutoData({ ...produtoData, name: e.target.value })} />
            <input className='input-c' type="number" value={produtoData.price || ""} onChange={(e) => setProdutoData({ ...produtoData, price: e.target.value })} />
            <select
              className='input-c'
              value={produtoData.category}
              required
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Selecione a categoria</option>
              <option value="plants">Plantas</option>
              <option value="vases">Vasos</option>
              <option value="other_products">Outros Produtos</option>
            </select>
            <input className='input-c' type="file" accept="image/" onChange={(e) => setProdutoData({ ...produtoData, image: e.target.files[0] })} />

            <div className='flex gap-2 justify-center'>
              <button className='btn-third mt-1 mx-0  px-1 py-0 text-xs md:text-sm md:leading-4' type="button" id="confirm-btn" onClick={() => updateProduct(produtoData)}>
                Confirmar
              </button>
              <button className='btn-third mt-1 mx-0 px-1 py-0 text-xs md:text-sm md:leading-4' type="button" id="cancel-btn" onClick={() => setDivUpdate(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
