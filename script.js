async function uploadImage() {
    const fileInput = document.getElementById('imageUpload');
    if (fileInput.files.length === 0) {
        alert('Veuillez sélectionner une image.');
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); // Remplace par ton propre upload preset de Cloudinary

    try {
        const response = await fetch('https://api.cloudinary.com/v1_1/your_cloud_name/image/upload', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();

        const searchResponse = await fetch(`https://api.cloudinary.com/v1_1/your_cloud_name/image/similar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + btoa('your_api_key:your_api_secret')
            },
            body: JSON.stringify({ public_id: result.public_id })
        });
        const searchResult = await searchResponse.json();

        const gallery = document.getElementById('gallery');
        gallery.innerHTML = '';
        searchResult.resources.forEach(image => {
            const img = document.createElement('img');
            img.src = image.secure_url;
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error('Erreur:', error);
        alert('Une erreur est survenue lors de la recherche d\'images.');
    }
}
