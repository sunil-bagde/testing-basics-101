import { Component } from "react";
import "./Toggle.css";

class Toggle extends Component {
    render() {
        const { toggle , onToggle = () => {} } = this.props;
     
        return (
            <span
                className="toggle"
                role="checkbox"
                tabIndex="0"
                onClick={onToggle}
                data-testid='toggle' 
                aria-checked={toggle.toString()}
            ></span>
        );
    }
}

export default Toggle;
