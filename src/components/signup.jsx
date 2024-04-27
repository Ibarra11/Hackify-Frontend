import { useEffect } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "./ui/separator";

import { Image } from "lucide-react";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import { registerUser } from "@/ApiServices/AuthService";
import { setJwt, getJwt } from "@/ApiServices/JwtService";
// import { setUser, getUser } from "@/ApiServices/UserService";

export default function SignUpForm() {

  const navigate = useNavigate();

  useEffect(() => {
    const user = getJwt();
    if(user){
      navigate('/')
    }
  }, [])

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, formikBag) => {
      const { jwt, success } = await registerUser(values);

      if (success) {
        setJwt(jwt);
        // setUser(jwt);
        navigate("/");
      } else {
        alert("Error registering");
      }
    },
  });

  console.log(formik.errors);

  return (
    <div className="h-screen w-full">
      <div className="w-full h-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
        <div className="flex order-2 items-center justify-center py-12">
          <div className="mx-auto grid w-[350px] gap-6">
            <div className="grid gap-2 text-center">
              <h1 className="text-3xl font-bold">Sign Up</h1>
              <p className="text-balance text-muted-foreground">
                Enter your information below to get started
              </p>
            </div>
            <form onSubmit={formik.handleSubmit}>
              <div className="grid gap-4">
                <div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="text"
                      // placeholder="m@example.com"
                      value={formik.values.email}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.email && formik.touched.email
                          ? "border-destructive"
                          : ""
                      }
                      // required
                    />
                  </div>
                  <EmailError formik={formik} />
                </div>
                <div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      // required
                      value={formik.values.password}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.password && formik.touched.password
                          ? "border-destructive"
                          : ""
                      }
                    />
                  </div>
                  <PasswordError formik={formik} />
                </div>
                <div>
                  <div className="grid gap-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={formik.values.confirmPassword}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                      className={
                        formik.errors.confirmPassword &&
                        formik.touched.confirmPassword
                          ? "border-destructive"
                          : ""
                      }
                      // required
                    />
                  </div>
                  <ConfirmPasswordError formik={formik} />
                </div>
                <Button type="submit" className="w-full">
                  Sign Up
                </Button>
                <div className="relative my-2">
                  <Separator />
                  <div className="absolute leading-[100%] px-2 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-background text-sm text-muted-foreground">
                    or continue with
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Google
                </Button>
              </div>
            </form>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link to="/login" className="underline">
                Login
              </Link>
            </div>
          </div>
        </div>
        <div className="hidden order-1 bg-muted lg:grid place-items-center">
          {/* <Image
            src="/placeholder.svg"
            alt="Image"
            width="1920"
            height="1080"
            className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
          /> */}
          <Image className="size-20" />
        </div>
      </div>
    </div>
  );
}

const EmailError = ({ formik }) => {
  return (
    <>
      {formik.errors.email && formik.touched.email ? (
        <div className="text-destructive mt-1">{formik.errors.email}</div>
      ) : null}
    </>
  );
};

const PasswordError = ({ formik }) => {
  return (
    <>
      {formik.errors.password && formik.touched.password ? (
        <div className="text-destructive mt-1">{formik.errors.password}</div>
      ) : null}
    </>
  );
};

const ConfirmPasswordError = ({ formik }) => {
  return (
    <>
      {formik.errors.confirmPassword && formik.touched.confirmPassword ? (
        <div className="text-destructive mt-1">
          {formik.errors.confirmPassword}
        </div>
      ) : null}
    </>
  );
};
