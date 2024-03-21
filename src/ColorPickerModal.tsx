// ColorPickerModal.tsx
import React from 'react';
import { Ball } from './Ball';

interface Props {
    ball: Ball;
    onClose: () => void;
}

const ColorPickerModal: React.FC<Props> = ({ ball, onClose }) => {
    const changeColor = (color: string) => {
        ball.color = color;
        onClose();
    };

    return (
        <div style={{ position: 'absolute', top: '20%', left: '40%', backgroundColor: '#fff', padding: '20px', borderRadius: '5px' }}>
            <p>Choose a color:</p>
            <button onClick={() => changeColor('red')}>Red</button>
            <button onClick={() => changeColor('green')}>Green</button>
            <button onClick={() => changeColor('blue')}>Blue</button>
            <button onClick={() => changeColor('yellow')}>Yellow</button>
            <button onClick={onClose}>Close</button>
        </div>
    );
};

export default ColorPickerModal;
