import React, { Children } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import mockAxios from 'jest-mock-axios';
import 'babel-polyfill';
import {Router as Router, Route, Switch}  from 'react-router-dom';
import LoginPage from '../../src/pages/loginPage'
import { createMemoryHistory } from 'history'
import Logout from '../../src/components/Logout'

jest.mock('axios')

describe('logout component', () => {

    it('should logout user', async () => {

        const history = createMemoryHistory()
        render( <Router history={history}>
                    <Logout>test</Logout>
                    <Route path="/login" exact component={LoginPage}/>
                </Router>)
       
        sessionStorage.setItem('user', "user");
        expect(history.location.pathname).toEqual('/')

        await fireEvent.click(screen.getByText(/test/i))
        expect(mockAxios).toHaveBeenCalledTimes(1)

        expect(mockAxios).toHaveBeenCalledWith({
         method: 'get',           
         url: 'api/logout'

        })

        let responseObj = {data: {message: "LOGOUT_SUCCESS", status: "success"}};
        await mockAxios.mockResponse({data : responseObj});
        expect(history.location.pathname).toEqual('/login')
        expect(Object.keys(sessionStorage.__STORE__).length).toBe(0);

        await waitFor(() => {
            expect(screen.getByText('Welcome to SQUIZZ')).toBeInTheDocument()
          })
    })
})
