import React, {useState} from 'react';
import { useNavigate } from 'react-router';

interface UserForm {
    name: string,
}

const CountryForm: React.FC = () => {

    const navigate = useNavigate();

    const [country, setCountry] = useState<UserForm>({
        name: ""
    });
    
    const handleChangeInput = (v: React.ChangeEvent<HTMLInputElement>) => {
        const _country = {...country, [v.target.name]: v.target.value};
        setCountry(_country);
    }

    const submit = () => {
        navigate(`/country/${country.name}`);
    }

    return (
        <div>
            
            <div>
                <input
                    type="text"
                    name="name"
                    value={country.name}
                    placeholder="Country name"
                    onChange={handleChangeInput}
                />
            </div>

            <div>
                <button
                    onClick={submit}
                    disabled={!country.name}
                >
                    SUBMIT
                </button>
            </div>
        </div>
    );
};

export default CountryForm;