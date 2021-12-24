import React, { useState } from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import img from "../src/world_chart.svg"

interface UserForm {
  name: string;
}

const CountryForm: React.FC = () => {
  const navigate = useNavigate();

  const [country, setCountry] = useState<UserForm>({
    name: "",
  });

  const handleChangeInput = (v: React.ChangeEvent<HTMLInputElement>) => {
    const _country = { ...country, [v.target.name]: v.target.value };
    setCountry(_country);
  };

  const submit = () => {
    navigate(`/country/${country.name}`);
  };

  return (
    <div>
      <img style={{width: "15%", marginTop: 50}} src={img} alt="world_chart" />
      <h2 style={{fontWeight: 500, marginTop: 50}}>SEARCH YOUR FAVORITE COUNTRY</h2>
      <div>
        <TextField
          variant="outlined"
          sx={{ width: "25%", mb: 2 }}
          type="text"
          name="name"
          value={country.name}
          placeholder="Country name"
          onChange={handleChangeInput}
        />
      </div>

      <div>
        <Button
          sx={{ width: "25%", mb: 3 }}
          onClick={submit}
          disabled={!country.name}
          variant="contained"
          size="large"
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default CountryForm;
