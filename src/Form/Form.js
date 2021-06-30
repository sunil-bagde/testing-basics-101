import React, { Component } from "react";
import "./Form.css";
import api from "./api";

export default class Form extends Component {
    state = {
        name: "",
        email: "",
        number: "",
        optIn: true,
        erros: {
            _name: "",
            _email: "",
            _number: "",
            _optIn: "",
        },
    };
    handleChange = (str) => (e) => {
        this.setState({ [str]: e.currentTarget.value });
    };
    handleSubmit = async (e) => {
        e.preventDefault();

        const name = this.state.name;
        const email = this.state.email;
        const number = this.state.number;
        const optIn = this.state.optIn;
        const erros = { ...this.state };
        if (name.length === 0) {
            erros["_name"] = "Name is required";
        }
        if (email.length === 0) {
            erros["_email"] = "Email is required";
        }
        if (number.length === 0) {
            erros["_number"] = "Number is required";
        }
        if (optIn === false) {
            erros["_optIn"] = "optIn is required";
        }
   
        let hasAnyErros = Object.keys(erros).every((e) => e.length === 0);

        if (!hasAnyErros) {
            this.setState({
                erros,
            });
        }
 

        const user = await api.addUser(
            this.state.name,
            this.state.email,
            this.state.number
        );
        if (user) {
            this.setState({
                name: "",
                email: "",
                number: "",
                optIn: false,
            });
        }
    };
    handlePromotionClick = (e) => {
        this.setState((prevState) => ({ optIn: !prevState.optIn }));
    };
    render() {
        const { erros } = this.state;
        //   const { name, number, email, optIn } = erros;

        return (
            <form data-testid="addUserForm" onSubmit={this.handleSubmit}>
                <input
                    data-testid="name"
                    type="text"
                    onChange={this.handleChange("name")}
                    placeholder="Name"
                    value={this.state.name}
                />
                <p className="alert">{erros._name}</p>

                <input
                    data-testid="email"
                    type="text"
                    onChange={this.handleChange("email")}
                    placeholder="Email"
                    value={this.state.email}
                />
                <p className="alert">{erros._email}</p>
                <input
                    data-testid="number"
                    type="text"
                    onChange={this.handleChange("number")}
                    placeholder="Mobile"
                    value={this.state.number}
                />
                <p className="alert">{erros._number}</p>
                <div>
                    <input
                        data-testid="checked"
                        type="checkbox"
                        checked={this.state.optIn}
                        onChange={() => {}}
                        onClick={this.handlePromotionClick}
                    />
                    <p data-testid="promotionsP" className="agree">
                        Accept terms
                    </p>
                    <p className="alert">{erros._optIn}</p>
                </div>
                <button type="submit" data-testid="submitButton">
                    Submit
                </button>
            </form>
        );
    }
}
