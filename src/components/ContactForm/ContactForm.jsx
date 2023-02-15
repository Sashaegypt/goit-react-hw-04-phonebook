import { useState } from 'react';
import { PropTypes } from 'prop-types'

import { Form, Label, Input, Button } from './ContactForm.styled'

export const ContactForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [number, setNumber] = useState('');

    const handleInputChange = event => {
        const { name, value } = event.currentTarget;

        switch (name) {
            case 'name':
                setName(value);
                break;
            
            case 'number':
                setNumber(value);
                break;
            
            default:
                break;
        }
    };

    const handleFormSubmit = event => {
        event.preventDefault();
        onSubmit({ name, number });
        resetInputValue();
    };

    const resetInputValue = () => {
        setName('');
        setNumber('');
    };

    //    handleInputChange = event => {
    //     const { name, value } = event.currentTarget;

    //     this.setState({
    //       [name]: value,
    //     });
    //   };

    //    handleFormSubmit = event => {
    //     event.preventDefault();
    //     this.props.onSubmit(this.state);
    //     this.resetInputValue();
    //     };
    
    //     resetInputValue = () => {
    //         this.setState({
    //             name: '',
    //             number: '',
    //         });
    //     };
    
    return (
        <Form onSubmit={handleFormSubmit}>
            <Label htmlFor='name'>Name</Label>
            <Input
                type="text"
                name="name"
                id="number"
                value={name}
                onChange={handleInputChange}
                pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
                required
            />
            <Label htmlFor='number'>Number</Label>
            <Input
                type="tel"
                name="number"
                id='number'
                value={number}
                onChange={handleInputChange}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                required
            />
            <Button type='submit'>Add contact</Button>
        </Form>
    );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};