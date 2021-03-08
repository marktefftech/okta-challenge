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

  const [group, setGroup] = useState();
  const [userId, setUserId] = useState();

  const handleSubmit= (e) => {
    e.preventDefault();
    var myHeaders = new Headers();
    myHeaders.append("Accept", "application/json");
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", "SSWS 00FOntn9OPT0EUhbomHN4U94qXCq1Q07jNHFZupgkO");
    myHeaders.append("Cookie", "DT=DI0Ul7AVGavRiG_swJ978yXiQ; JSESSIONID=0AE84B4F0F77D00191CFCD3302B9ABB5");

    var raw = "";

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    };

    var url = "https://stark-basin-42320.herokuapp.com/https://dev-85634308.okta.com/api/v1/groups/NobodyAtAll/users/" + userId

    fetch(url, requestOptions)
        .then(response => response.text())
        .then(result => {
        console.log(result)
        alert("User is now an admin");
        })
        .catch(error => console.log('error', error));
  }

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="level up alternate" />
          {' '}
          Create administrators
          {' '}
        </Header>
        <form onSubmit={e=>handleSubmit(e)}>
        <label>User ID</label>
        <br />
        <input 
          name='userId' 
          type='text'
          onChange={e => setUserId(e.target.value)}
          value={userId}
        />
        <br/>
        <label>Group</label>
        <br />
        <input
          name='group' 
          type='text'
          onChange={e => setGroup(e.target.value)}
          value={group}
        />
        <br/>
        <br/>
        <input 
          className='submitButton'
          type='submit' 
          //onSubmit={e => {handleSubmit(e)}}
          //onClick={e => {handleSubmit(e)}}
          //onClick={handleSubmit}
          value="God Mode"
        />
        </form>
      </div>
    </div>
  );
};

export default Admin;
