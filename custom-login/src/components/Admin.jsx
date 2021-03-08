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

import React, { useState, useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { Header, Icon, Table } from 'semantic-ui-react';
import AddUser from './AddUser';
import DeleteUser from './DeleteUser';
import CreateAdmin from './CreateAdmin';

const Admin = () => {
  const { authState, oktaAuth } = useOktaAuth();
  const [users, setUsers] = useState([]);
  

  // fetch messages
  useEffect(() => {
    console.log('aaas')
    if (authState.isAuthenticated) {
      
      const accessToken = oktaAuth.getAccessToken();
      fetch('https://stark-basin-42320.herokuapp.com/https://dev-85634308.okta.com//api/v1/users', {
        headers: {
          Authorization: `SSWS 00FOntn9OPT0EUhbomHN4U94qXCq1Q07jNHFZupgkO`,
          Accept: `application/json`,
          'Content-Type': `application/json`,
          'Cookie': 'DT=DI0Ul7AVGavRiG_swJ978yXiQ'
        },
      })
        .then((response) => {
          if (!response.ok) {
            return Promise.reject();
          }
          return response.json();
        })
        .then((data) => {
          setUsers(data)
          //oktaAuth.getUser().then((info) => {
            //setUserInfo(info)
          // setMessageFetchFailed(false);
        })
        .catch((err) => {
          // setMessageFetchFailed(true);
          /* eslint-disable no-console */
          console.error(err);
        });
    }
  }, [authState]);
  // refresh page after submitting "Welcome" button

  if (!authState.idToken.claims.customGroupClaim) {
    console.log('found the claim: ')
    return (
      <div>
        <p>You can't see this since you aren't an admin :(</p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <Header as="h1">
          <Icon name="edit outline" />
          {' '}
          Administrative Profile
          {' '}
        </Header>
        <p>
          This route is protected with both the
          {' '}
          <code className="codeText">&lt;SecureRoute&gt;</code>
          {' '}
          and
          {' '}
          <code className="codeText">Okta Groups</code>
          {' '}
          , which will ensure that this page cannot be accessed until you have authenticated and are labeled as an Administrator
        </p>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Status</th>
              <th>Last Login</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 && Object.entries(users).map((user) => {
              const userId = user[1].id;
              const userFirstName = user[1].profile.firstName;
              const userStatus = user[1].status;
              const lastLogin = user[1].lastLogin;
              console.log(user)
              return (
                <tr key={userId}>
                  <td>{userId}</td>
                  <td>{userFirstName}</td>
                  <td>{userStatus}</td>
                  <td>{lastLogin}</td>
                </tr>
              );
            })}
          </tbody>    
        </Table> 
        <br />
        <AddUser />
        <br />
        <DeleteUser />
        <br />
        <CreateAdmin />
      </div>
    </div>
  );
};

export default Admin;
