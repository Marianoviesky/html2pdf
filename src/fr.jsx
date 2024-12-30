const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    photo: null,
    background: '',
  });

  const [photoDataUrl, setPhotoDataUrl] = useState(null);

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

  const handleGeneratePDF = async () => {
    try {
      const response = await axios.post('http://localhost:5000/generate-pdf', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        photo: photoDataUrl,
        background: formData.background,
      }, {
        responseType: 'arraybuffer', // Get the PDF as a binary stream
      });

      const blob = new Blob([response.data], { type: 'application/pdf' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = `${formData.firstName}_${formData.lastName}_profile.pdf`;
      link.click();
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
// const imre ="
//   https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ

//   https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ
//   "