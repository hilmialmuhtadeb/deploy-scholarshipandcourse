import axios from "axios";
import swal from "sweetalert";

const registerUser = (user) => {
  const { name, username, password } = user;
  const formData = new FormData();
  formData.append('name', name);
  formData.append('username', username);
  formData.append('password', password);

  axios.post('http://scholarshipandcourse.rizqisyahrendra.tech/v1/auth/register', formData)
    .then((response) => {
      if (response.status === 201) {
        swal({
          title: "Selamat!",
          text: `${response.data.message}`,
          icon: "success",
          button: "Ok",
        })
          .then((result) => {
            window.location.href = `/login`;
          });
      }
    })
    .catch((error) => {
      swal({
        title: "Gagal!",
        text: `${error.response.data.message}`,
        icon: "error",
        button: "Ok",
      });
    });
}

const loginUser = (user) => {
  const { username, password } = user;
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);

  axios.post('http://scholarshipandcourse.rizqisyahrendra.tech/v1/auth/login', formData, {
    withCredentials: true,
  })
    .then((response) => {
      return window.location.href = '/';
    })
    .catch((error) => {
      swal({
        title: "Gagal Login!",
        text: "Username atau Password Anda Salah.",
        icon: "error",
        button: "Ok",
    });
  });
}

const logoutUser = () => {
  swal({
    title: "Keluar?",
    text: "Apakah Anda yakin untuk keluar dari aplikasi?",
    icon: "warning",
    buttons: ["Batal", "Ok"],
    dangerMode: true,
  })
  .then((willLogout) => {
    if (willLogout) {
      axios.post('http://scholarshipandcourse.rizqisyahrendra.tech/v1/auth/logout', '', {
        withCredentials: true,
      })
        .then((res) => {
          swal("Berhasil keluar!", {
            icon: "success",
          }).then((res) => window.location.href = '/login');
        })
        .catch((err) => {
          swal("Gagal Logout!");
        });
    }
  });
}

export {
  registerUser,
  loginUser,
  logoutUser
};