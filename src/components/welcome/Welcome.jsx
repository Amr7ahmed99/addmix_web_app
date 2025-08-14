import './welcome.css';
import DarkVeil from "../general/dark_veil/DarkVeil";

export default function Welcome(){
    return (
        <div className="home-page" style={{ width: '100%', height: '100vh', position: 'relative' }}>
            <div className="home-bg-div">
                <DarkVeil />

            </div>
        </div>);
}