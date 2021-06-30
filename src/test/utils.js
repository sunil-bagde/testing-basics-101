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
export { updateInput, getByTestId };
