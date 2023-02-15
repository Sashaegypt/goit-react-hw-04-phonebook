import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';

import { GlobalStyle } from './GlobalStyle';
import { Title, Contact, Div } from './App.styled';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { Filter } from 'components/Filter/Filter';
import { ContactList } from 'components/ContactList/ContactList';

export const App =() => {

  const [contacts, setContacts] = useState(() => {
    const contacts = JSON.parse(window.localStorage.getItem('contacts'));
    return contacts ? contacts : [];
  });
  const [filter, setFilter] = useState('');

  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const createContactItem = ({ name, number }) => {
    const isIncludeName = contacts.some(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (!isIncludeName) {
      setContacts(prevState => {
        const contact = {
          id: nanoid(),
          name,
          number,
        };
        return [contact, ...prevState];
      });
    } else alert(`${name} is already ib contacts`);
  };

  const changeFilter = ({ target }) => setFilter(target.value);

  const filterContactItem = () => {
    const normalizedFilter = filter.toLowerCase();
    const filterItem = contacts.filter(({ name }) => name.toLowerCase().includes(normalizedFilter));
    return filterItem;
  };

  const deleteContactItem = itemId => {
    setContacts(prevState => prevState.filter(contact => contact.id !== itemId));
  };

  // changeFilter = event => {
  //   const { value } = event.currentTarget;
  //   this.setState({
  //     filter: value,
  //   });
  // };

    return (
      <Div>
        <GlobalStyle />
        <Title>Phonebook</Title>
        <ContactForm onSubmit={createContactItem} />
        <Contact>Contacts</Contact>
        <Filter value={filter} onChange={changeFilter} />
        {contacts.length > 0 && (
          <ContactList items={filterContactItem()} onDelete={deleteContactItem} />
        )}
      </Div>
    );
  
}

  // componentDidMount() {
  //   const contactsSaveInLocal = JSON.parse(localStorage.getItem('contacts'));
  //   if (contactsSaveInLocal) {
  //     this.setState({ contacts: contactsSaveInLocal });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   const { contacts } = this.state;
  //   if (contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(contacts));
  //   }
  // }