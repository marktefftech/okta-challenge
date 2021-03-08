/* eslint-disable */
/*
 * Copyright (c) 2018, Okta, Inc. and/or its affiliates. All rights reserved.
 * The Okta software accompanied by this notice is provided pursuant to the Apache License, Version 2.0 (the "License.")
 *
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0.
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *
 * See the License for the specific language governing permissions and limitations under the License.
 */
import { Header, Icon} from 'semantic-ui-react';
import React, { useState } from 'react';


const Admin = () => {

  const [firstName, setfirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();

  const handleSubmit= (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "SSWS 00FOntn9OPT0EUhbomHN4U94qXCq1Q07jNHFZupgkO");
    myHeaders.append("Cookie", "DT=DI0Ul7AVGavRiG_swJ978yXiQ; JSESSIONID=B317B039E46BA1694F0F77EE71852437");

    var raw = JSON.stringify({
      "profile":{
        "firstName": firstName,
        "lastName": lastName,
        "email": email,
        "login": email
      }}
    );

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    fetch("https://dev-85634308.okta.com//api/v1/users?activate=false", requestOptions)
      .then(response => response.text())
      .then(result => {
        console.log(result)
        alert("Successfully registered user");
        // what kind of comfirn message do you need?
        // "Successfully registered user"
      })
      .catch(error => console.log('error', error));
  }

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="plus square outline" />
          {' '}
          Add Users
          {' '}
        </Header>
        <form onSubmit={e=>handleSubmit(e)}>
        <label>First Name</label>
        <br />
        <input 
          name='firstName' 
          type='text'
          onChange={e => setfirstName(e.target.value)}
          value={firstName}
        />
        <br/>
        <label>Last Name</label>
        <br />
        <input 
          name='lastName' 
          type='text' 
          onChange={e => setLastName(e.target.value)}
          value={lastName}
        />
        <br />
        <label>Email</label>
        <br />
        <input
          name='email' 
          type='text'
          onChange={e => setEmail(e.target.value)}
          value={email}
        />
        <br/>
        <br/>
        <input 
          className='submitButton'
          type='submit' 
          //onSubmit={e => {handleSubmit(e)}}
          //onClick={e => {handleSubmit(e)}}
          //onClick={handleSubmit}
          value="Welcome"
        />
        </form>
      </div>
    </div>
  );
};

export default Admin;
