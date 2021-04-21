

import React from 'react';
interface Props {
    children: React.ReactNode;
    Body: React.ReactNode
}

interface TypeName {
    type: {
       name: string 
    }
    
}

// const Card:React.FC<Props> = ({ children }) => {
//     let subComponentList = Object.keys(Card);

//     let subComponents = subComponentList.map((key) => {
//         return React.Children.map(children, (child: React.ReactNode) =>
//             child!.type.name === key ? child : null
//         );
//     });

//     return (
//         <>
//             <div className='card'>
//                 {subComponents.map((component) => component)}
//             </div>
//         </>
//     );
// };


const Card:React.FC<Props> = ({ children }) => {
    let subComponents =  React.Children.map(children, (child) => {
        return React.cloneElement(child as any);
    });

    return (
        <>
            <div className='card'>
                {subComponents}
            </div>
        </>
    );
};



const Header:React.FC<Props> = (props) => <div className='card-header'>{props.children}</div>;
(Card as any).Header = Header;

const Body:React.FC<Props> = (props) => <div className='card-body'>{props.children}</div>;
(Card as any).Body = Body;

const Footer:React.FC<Props> = (props) => <div className='card-footer'>{props.children}</div>;
(Card as any).Footer = Footer;

export default Card;