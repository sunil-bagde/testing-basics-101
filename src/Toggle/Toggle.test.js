import { shallow, mount } from "enzyme"; 
import toJson from "enzyme-to-json";
import ToggleWrapper from "./ToggleWrapper";
import Toggle from "./Toggle";

import { getByTestId } from "../test/utils";

describe("<ToggleWrapper />", () => {
     test("matches saved snapshot <ToggleWrapper /> ", () => {
        const wrapper = shallow(<ToggleWrapper />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });
    test("should render default state", () => {
        const wrapper = shallow(<ToggleWrapper />);
        const toggleButton = wrapper.find(getByTestId("toggle-text"));
        const checker = toggleButton.text();
        expect(checker).toBe("No");
        wrapper.unmount();
    });

    test("Should changed based on props", () => {
        const wrapper = shallow(<Toggle toggle={false} />);
        const toggleButton = wrapper.find(getByTestId("toggle"));
        const checker = toggleButton.props()["aria-checked"];
        expect(checker).toBe("false");
        wrapper.unmount();
    });

    test("should 'Toggle' on click ", () => {
        const wrapper = mount(<ToggleWrapper />);
        let toggleButton = wrapper.find(getByTestId("toggle"));
        toggleButton.simulate("click"); 
        wrapper.update();
        toggleButton = wrapper.find(getByTestId("toggle"));
        const toggleButton1 = wrapper.find(getByTestId("toggle-text"));
        expect(toggleButton1.text()).toBe("Yes");
        expect(toggleButton.props()["aria-checked"]).toBe("true");
        wrapper.unmount();
    });

});
