const fileTypes = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const preview = document.querySelector('.img-upload__preview img');

const loadUserPicture = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = fileTypes.some((it) => fileName.endsWith(it));

  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
};

export { loadUserPicture };
