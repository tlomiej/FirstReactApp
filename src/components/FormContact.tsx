import { TextField } from "@material-ui/core";
import React from "react";
import ReactDOM from "react-dom";
import { Controller, useForm } from "react-hook-form";

enum GenderEnum {
  female = "female",
  male = "male"
}

interface IFormInput {
  firstName: String;
  gender: GenderEnum;
  temat: String;

}

export default function App() {
  const { register, handleSubmit,control } = useForm<IFormInput>();

  const onSubmit = (data: IFormInput) => {
    console.log(data)
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
  as={<TextField />}
  name="firstName"
  label="First Name"
  control={control}
  defaultValue=""
/>
       <TextField  name="temat" ref={register} required id="standard-required" label="Required" defaultValue="XXX" />
      <label>First Name</label>
      <input name="firstName" ref={register} />
      <label>Gender Selection</label>
      <select name="gender" ref={register}>
        <option value="female">female</option>
        <option value="male">male</option>
      </select>
      <input type="submit" />
    </form>
  );
}