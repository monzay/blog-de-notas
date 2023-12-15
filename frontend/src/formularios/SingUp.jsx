import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AccesoAppContexto } from "../Providers/AccesoAppProvider";
import { useEffect, useContext } from "react";

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = "Required";
  } else if (values.name.length > 15) {
    errors.name = "Must be 15 characters or less";
  }

  if (!values.password) {
    errors.password = "Required";
  } else if (!values.password > 8) {
    errors.password = "la contraseña es muy corta";
  }

  if (!values.email) {
    errors.email = "Required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  return errors;
};
export const SingUP = () => {
  const { setToken, token } = useContext(AccesoAppContexto);

  const navigate = useNavigate();
  useEffect(() => {
    if (token) navigate("/login");
  }, []);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validate,
    onSubmit: async (values) => {
      try {
        const data = await fetch("http://localhost:3000/singUp", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const res = await data.json();
        const meterCredencialesLocal = {
          id_user: res.id_user,
          name: res.nombre,
          email: res.email,
        };
        await localStorage.setItem(
          "credenciales",
          JSON.stringify(meterCredencialesLocal)
        );
        if (res.booleanoLogin) navigate("/login");
      } catch (e) {
        console.log(e.errors);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="name">name</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div>{formik.errors.name}</div>
      ) : null}

      <label htmlFor="email">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.email}
      />
      {formik.touched.email && formik.errors.email ? (
        <div>{formik.errors.email}</div>
      ) : null}

      <label htmlFor="password">password</label>
      <input
        id="password"
        name="password"
        type="password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.password}
      />
      {formik.touched.password && formik.errors.password ? (
        <div>{formik.errors.password}</div>
      ) : null}

      <button type="submit">Submit</button>
    </form>
  );
};
