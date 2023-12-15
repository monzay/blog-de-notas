import { useFormik } from "formik";
import { useContext } from "react";
import { AccesoAppContexto } from "../Providers/AccesoAppProvider";
import { useNavigate } from "react-router-dom";
const validate = (values) => {
  const errors = {};

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
export const Login = () => {
 const {setToken} = useContext(AccesoAppContexto)

 const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
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
          const response = await data.json()
          setToken(response.token)
          if(response.token) navigate('/app');
        
      } catch (e) {
        console.log(e.errors);
      }
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <label htmlFor="email">email</label>
      <input
        id="email"
        name="email"
        type="text"
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
