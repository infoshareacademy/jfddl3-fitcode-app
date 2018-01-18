import React from 'react'
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const style = {
    margin: 12,
    position: "fixed",
    bottom: 0,
    right: 0
};

const ShareButton = () => (
    <div>
        <FloatingActionButton
            style={style}
            onClick={()=>window.open('http://www.facebook.com/sharer.php?u=http://app.fitcode.jfddl3.is-academy.pl')}
        >
            <ContentAdd/>
        </FloatingActionButton>
    </div>

)

export default ShareButton;