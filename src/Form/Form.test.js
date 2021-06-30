import React from "react";
import Form from "./Form";
import { shallow, configure } from "enzyme";
import toJson from "enzyme-to-json";
import api from "./api";

function updateInput(wrapper, instance, newValue) {
    const input = wrapper.find(instance);
    input.simulate("change", {
        currentTarget: { value: newValue },
    });
    return wrapper.find(instance);
}
function getByTestId(name) {
    return `[data-testid="${name}"]`;
}
describe("<Form />", () => {
    test("Terms should default checked ", () => {
        const wrapper = shallow(<Form />);
        const terms = wrapper.find(getByTestId("checked"));
        const checker = terms.props().checked;
        expect(checker).toBe(true);
    });

    test("user should to fill form", () => {
        const wrapper = shallow(<Form />);

        const nameInput = updateInput(wrapper, getByTestId("name"), "admin");

        expect(nameInput.props().value).toBe("admin");

        const emailInput = updateInput(
            wrapper,
            getByTestId("email"),
            "admin@gmail.com"
        );
        const numberInput = updateInput(
            wrapper,
            getByTestId("number"),
            "8655062213"
        );
        wrapper.find(getByTestId("checked")).simulate("click");

        expect(nameInput.props().value).toBe("admin");
        expect(emailInput.props().value).toBe("admin@gmail.com");
        expect(numberInput.props().value).toBe("8655062213");
        expect(wrapper.find(getByTestId("checked")).props().checked).toBe(
            false
        );
    });
    test("matches saved snapshot", async () => {
        const wrapper = shallow(<Form />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

     test("submits fails when validation errors ", () => {
        let response = null;
        jest.spyOn(api, "addUser").mockImplementation(
            () => (response = Promise.resolve({ data: "New User Added" }))
        );
        const wrapper = shallow(<Form />);
        updateInput(wrapper, getByTestId("name"), "");
        updateInput(wrapper, getByTestId("email"), "");
        updateInput(wrapper, getByTestId("number"), "");
        updateInput(wrapper, getByTestId("checked"), false);
                wrapper
            .find(getByTestId("addUserForm"))
            .simulate("submit", { preventDefault: () => {} });
          //  wrapper.find(".alert").toMatchSnapshot();

           expect(toJson(wrapper.find(".alert"))).toMatchSnapshot();
    });

    test("submits the form", () => {
        let response = null;
        jest.spyOn(api, "addUser").mockImplementation(() =>
          response =   Promise.resolve({ data: "New User Added" })
        );

        const wrapper = shallow(<Form />);
        updateInput(wrapper, getByTestId("name"), "admin");
        updateInput(wrapper, getByTestId("email"), "test@gmail.com");
        updateInput(wrapper, getByTestId("number"), "8655091122");
        wrapper
            .find( getByTestId("addUserForm"))
            .simulate("submit", { preventDefault: () => {} });
        expect(api.addUser).toHaveBeenCalledWith(
            "admin",
            "test@gmail.com",
            "8655091122"
        );
        response.then(r => {
            expect(r.data).toMatchSnapshot()
        })
    });
});

 


 
