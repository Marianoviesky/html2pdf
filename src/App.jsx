import React, { useState ,useEffect,useRef} from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastContainer, toast } from 'react-toastify';

import { Profil } from './profil';
const App = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    work:''
    
  });

  const [photoDataUrl, setPhotoDataUrl] = useState(null);
  const [bgDataUrl, setBgDataUrl] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setPhotoDataUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoChangeB = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setBgDataUrl(reader.result);
      reader.readAsDataURL(file);
    }
  };
const generate = useRef(null)

const downloadItem = async()=>{
  if (!formData.firstName || !formData.lastName || !formData.work ) {
    toast.error("Une erreur s'est produite !", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
      });
  }else{

  
    

    const id = toast.loading('⌛ Pdf en cours de téléchargement !', {
      position: "top-right",
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
    });

    setTimeout(()=>{
      toast.update(id, {
        render: '✅ Téléchargement terminé !',
        type: 'success',
        isLoading: false,
        theme: "light",
        autoClose: 2000,
      });
    },3000)

const inputData= generate.current

try {
  const canvas = await html2canvas(inputData)
  const imgData = canvas.toDataURL('image/png')
  const pdf = new jsPDF({
    orientation:'portrait',
    unit: 'px',
    format: "a4"
    
  })
  
  const width = pdf.internal.pageSize.getWidth()
  const height = (canvas.height * width) / canvas.width

  pdf.addImage(imgData,"PNG",0,0,width,height)
  pdf.save(`${formData.firstName}_profil.pdf`)
  setFormData({
    firstName: '',
    lastName: '',
    work:''
    
  });
  setBgDataUrl(null)
  setPhotoDataUrl(null)
} catch(error){
  console.log(error)
}
  }
}



  return (
    <>
    
    <div className="p-6  ">
      <h1 className="text-2xl font-bold text-center mb-6">Méthode Profil Pdf &#x1F915;      </h1>
      <form className="mb-6">
        <div className="mb-4">
          <label className="block font-medium mb-1">Prénom :</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            placeholder="Entrez votre prénom"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Nom :</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            placeholder="Entrez votre nom"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Profession :</label>
          <input
            type="text"
            name="work"
            value={formData.work}
            onChange={handleInputChange}
            className="w-full border rounded p-2"
            placeholder="Entrez votre nom"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Photo :</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="w-full border p-2"
          />
        </div>
        <div className="mb-4">
          <label className="block font-medium mb-1">Background :</label>
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChangeB}
            className="w-full border p-2"
          />
        </div>
        
      </form>
      <div className="text-center">
        <button
          onClick={()=>downloadItem()}
          className="px-4 py-2 bg-blue-900 text-white rounded shadow"
        >
          Télécharger le PDF
        </button>
      </div>
      
    </div>
<div className="" ref={generate}>
   

      <Profil
      name={formData.firstName}
      lastname={formData.lastName}
      work={formData.work}
      profil={photoDataUrl}
      bg={bgDataUrl}
      downloadItem={downloadItem}/>
</div>
<ToastContainer />

    </>
  );
};

export default App;
