import React from 'react';
import {Provider } from 'react-redux';
import { mount } from 'enzyme';
import App from './App';
import configureStore from 'redux-mock-store'

const initialState =  {
                        data: {
                          results:[{
                              id: 1,
                              name: "Rick Sanchez",
                              status: "Alive",
                              species: "Human",
                              type: "",
                              gender: "Male",
                              origin: {name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1"},
                              location: {name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20"},
                              image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
                              created: "2017-11-04T18:48:46.250Z"
                            },
                            {
                              id: 2,
                              name: "Morty Smith",
                              status: "Alive",
                              species: "Human",
                              type: "",
                              gender: "Male",
                              origin: {name: "Earth (C-137)", url: "https://rickandmortyapi.com/api/location/1"},
                              location: {name: "Earth (Replacement Dimension)", url: "https://rickandmortyapi.com/api/location/20"},
                              image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
                              url: "https://rickandmortyapi.com/api/character/2",
                              created: "2017-11-04T18:50:21.651Z",
                            }
                          ], 
                          info:{
                            count: 2,
                            pages: 1,
                            next: "",
                            prev: ""
                          }, isLoadingData: false}};
const mockStore = configureStore();
let component;
let store;
describe('<App container />', () => {
  beforeEach(() => {
    store = mockStore(initialState)
    const spy = jest.fn();
    component = mount(<Provider store={store}  ><App fetchArticleByName={spy}  /></Provider>);
  });
  it('renders', () => {
    expect(component.length).toEqual(1);
  });
  it('it should not render loading text ', () => {
    expect(component.find('[data-test-handle="loading-text"]').length).toEqual(0);
  });
  it('it should render Article component text ', () => {
    expect(component.find('Article').length).toEqual(2);
  });

  
});