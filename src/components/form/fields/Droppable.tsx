import React from 'react';
import {useDroppable} from '@dnd-kit/core';

type PropsType = {
    children: React.ReactNode;
};

const Droppable = (props: PropsType) => {
    const { isOver, setNodeRef } = useDroppable({
        id: 'droppable',
    });
    const style = {
        color: isOver ? 'green' : undefined,
    };

    return (
        <div ref={setNodeRef} style={style}>
            {props.children}
        </div>
    );
};

export default Droppable;