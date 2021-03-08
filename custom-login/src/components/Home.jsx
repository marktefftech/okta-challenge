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

import { useOktaAuth } from '@okta/okta-react';
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Header } from 'semantic-ui-react';
import '../index.css';

const Home = () => {
  const history = useHistory();
  const { authState, oktaAuth } = useOktaAuth();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    if (!authState.isAuthenticated) {
      // When user isn't authenticated, forget any user info
      setUserInfo(null);
    } else {
      oktaAuth.getUser().then((info) => {
        setUserInfo(info);
      });
    }
  }, [authState, oktaAuth]); // Update if authState changes

  const login = async () => {
    history.push('/login');
  };

  if (authState.isPending) {
    return (
      <div>Loading...</div>
    );
  }

  return (
    <div>
      <div>
        <Header className="testi" as="h1">🏦 Clubhouse Bank 🏦</Header>
        <Header as="h2">Congrats, you are now securely logged into your account</Header>

        { authState.isAuthenticated && !userInfo
        && <div>Loading user information...</div>}

        {authState.isAuthenticated && userInfo
        && (
        <div>
          <p>
            Welcome back,&nbsp;
            {' '}
            <code className="codeText">{userInfo.name}</code>
            {' '}
            !
          </p>
          <p>
            You were greatly missed by your account manager,&nbsp;
            {' '}
            <code className="codeText">{userInfo.manager}</code>
            {' '}
          </p>
          <h3>Next Steps</h3>
          <div>
            <ul>
              <li>
                <p>
                  You have successfully authenticated against through Okta and have an ID token and access token in local storage.
                  Visit your
                  {' '}
                  <a href="/profile">profile</a>
                  {' '}
                  page to take a look.
                </p>
              </li>
            </ul>
          </div>
        </div>
        )}

        {!authState.isAuthenticated
        && (
        <div>
          <p>
            When you click the login button below, you will be redirected to the login page on your Okta org.
            After you authenticate, you will be returned to this application with an ID token and access token.  These tokens will be stored in local storage and can be retrieved at a later time.
          </p>
          <Button id="login-button" primary onClick={login}>Login</Button>
        </div>
        )}

      </div>
    </div>
  );
};
export default Home;
