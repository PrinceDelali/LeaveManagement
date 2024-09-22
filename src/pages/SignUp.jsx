import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { db, signUp } from "../firebase/config";
import { doc, serverTimestamp, setDoc } from "firebase/firestore";
import { useState } from "react";

export default function SignUp() {
  const { register, reset, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { email, password } = data;

      const res = await signUp(email, password);

      setDoc(doc(db, "users", res.user.uid), {
        id: res.user.uid,
        ...data,
        timestamp: serverTimestamp(),
      });
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    reset();
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-x-4 bg-[url('https://aford.be/wp-content/uploads/2019/04/rawpixel-uns1.jpg')] bg-no-repeat bg-cover object-cover before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:opacity-90 top-0 right-0 -z-30">
    <div className="min-h-screen flex justify-center items-center">
      <form className="mt-10" onSubmit={handleSubmit(onSubmit)}>
        <Card className="w-96">
          <CardHeader
            variant="gradient"
            color="gray"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Sign Up
            </Typography>
          </CardHeader>
          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              size="lg"
              type="email"
              {...register("email", { required: true })}
            />
            <Input
              label="Password"
              size="lg"
              type="password"
              {...register("password", { required: true })}
            />
          </CardBody>
          <CardFooter className="pt-0">
            <Button
              variant="gradient"
              fullWidth
              type="submit"
              loading={loading}
              className="flex justify-center"
            >
              {!loading && "Sign Up"}
            </Button>
            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Link to="/log-in" className="ml-1 font-bold">
                Log In
              </Link>
            </Typography>
          </CardFooter>
        </Card>
      </form>
      </div>
      </div>
  );
}
