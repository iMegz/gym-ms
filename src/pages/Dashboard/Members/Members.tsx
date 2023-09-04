import { useEffect, useState } from "react";
import { DashboardProps } from "../Dashboard";
import style from "./Members.module.css";
import InputField from "../../../components/InputField/InputFIeld";
import Button from "../../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { isEmail, isPhoneNumber } from "../validators";

type FindByOptions = "id" | "email" | "phone";
type SelectChangeEvent = React.ChangeEvent<HTMLSelectElement>;

const Members: React.FC<DashboardProps> = ({ loaded }) => {
    const [searchValue, setSearchValue] = useState("");
    const [findBy, setFindBy] = useState<FindByOptions>("id");
    const [isValid, setIsValid] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        loaded();
    }, []);

    // Validate input
    useEffect(() => {
        switch (findBy) {
            case "email":
                setIsValid(isEmail(searchValue));
                break;
            case "phone":
                setIsValid(isPhoneNumber(searchValue));
                break;
            default:
                setIsValid(Boolean(searchValue) && !Number.isNaN(+searchValue));
                break;
        }
    }, [searchValue, findBy]);

    function handleOnIdChange(value: string) {
        if (value !== " ") setSearchValue(value);
    }

    function handleFindByChange({ target }: SelectChangeEvent) {
        setFindBy(target.value as FindByOptions);
    }

    function handleView() {
        // Replace condition by checking if member exists
        if (findBy === "id") navigate("/profile/" + searchValue);
    }

    return (
        <>
            <h1>Members</h1>
            <section className={`floating-section ${style.members}`}>
                <h2>Find Member</h2>
                <select
                    defaultValue="id"
                    id="findBy"
                    onChange={handleFindByChange}
                >
                    <option value="id">ID</option>
                    <option value="email">Email</option>
                    <option value="phone">Phone</option>
                </select>
                <InputField
                    value={searchValue}
                    label={`Member ${findBy}`}
                    onChange={({ target }) => handleOnIdChange(target.value)}
                />
                <Button label="View" onClick={handleView} disabled={!isValid} />
            </section>
        </>
    );
};

export default Members;
