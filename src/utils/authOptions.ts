import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { checkLogin } from 'sections/auth/auth-forms/_services/login';
import axios from 'utils/axios';

let users = [
  {
    id: 1,
    name: 'Jone Doe',
    email: 'mailto:info@codedthemes.com',
    password: '123456'
  }
];

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET_KEY,
  providers: [
    CredentialsProvider({
      id: 'login',
      name: 'login',
      credentials: {
        email: { name: 'email', label: 'Email', type: 'text', placeholder: 'Enter Email' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        // @Final code
        const email = credentials?.email;
        const password = credentials?.password;
        console.log(email);
        console.log(password);
        console.log('credentials::');
        console.log(credentials);
        // return (
        //   axios
        //     .post('/api/auth/local', {
        //       identifier: '656569891@gmail.com',
        //       password: '1234567890'
        //     })
        //     .then((response) => {
        //       console.log('response::');
        //       console.log(response);
        //       return response.data;
        //     })
        //     .catch((error) => {
        //       console.log('error:::');
        //       console.log(error.response);
        //       throw new Error(error.response.data.message);
        //     }) || null
        // );
        // return null;
        // if (email != '656569891@gmail.com' || password != '123456789') {
        //   return null;
        // }
        // // if everything ok
        // return { id: '1234', name: 'vivekgupta', email: 'viveksite01@gmail.com' };
        // // @paresh sir code @vinkCard
        // const email = credentials?.email || '';
        // const password = credentials?.password || '';
        // if (email.trim().length > 0 && password.trim().length > 0) {
        //   //console.log(email, password);
        //   console.log('email' + email);
        //   console.log(password);
        //   // const result = await checkLogin({ email, password });
        //   const user = await axios.post('http://localhost:1337/api/auth/local', {
        //     identifier: email,
        //     password: password
        //   });
        //   console.log('result::::');
        //   console.log(user);
        //   // if (result && result.hasOwnProperty("jwt")) {
        //   //   const { ...rest } = result.user;
        //   //   rest.jwt = result.jwt;
        //   //   rest.brandDetails = result.brand_details;
        //   //   //console.log(rest);
        //   //   return {
        //   //     ...rest,
        //   //   };
        //   // }
        //   return { id: 3, name: 'vivek', last: 'gupta', email: 'vivek@gmail.com' };
        //   throw new Error('Invalid Email or Password');
        // } else {
        //   throw new Error('Invalid input - All field is mandatory.');
        // }

        // // @Template default code
        try {
          console.log('user:');
          const user = await axios.post('http://localhost:1337/api/auth/local', {
            identifier: email,
            password: password
          });

          console.log('user::');
          // console.log(user);
          return user;

          // if (user) {
          //   user.data.user['accessToken'] = user.data.serviceToken;
          //   return user.data.user;
          // }
        } catch (e: any) {
          return null;
          const errorMessage = e?.response.data.message;
          throw new Error(errorMessage);
        }
      }
    }),
    CredentialsProvider({
      id: 'register',
      name: 'Register',
      credentials: {
        firstname: { name: 'firstname', label: 'Firstname', type: 'text', placeholder: 'Enter Firstname' },
        lastname: { name: 'lastname', label: 'Lastname', type: 'text', placeholder: 'Enter Lastname' },
        email: { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
        company: { name: 'company', label: 'Company', type: 'text', placeholder: 'Enter Company' },
        password: { name: 'password', label: 'Password', type: 'password', placeholder: 'Enter Password' }
      },
      async authorize(credentials) {
        try {
          const user = await axios.post('/api/account/register', {
            firstName: credentials?.firstname,
            lastName: credentials?.lastname,
            company: credentials?.company,
            password: credentials?.password,
            email: credentials?.email
          });

          if (user) {
            users.push(user.data);
            return user.data;
          }
        } catch (e: any) {
          const errorMessage = e?.response.data.message;
          throw new Error(errorMessage);
        }
      }
    })
  ],
  callbacks: {
    jwt: async ({ token, user, account }) => {
      console.log('token');
      console.log(token);
      // if (user) {
      //   // @ts-ignore
      //   token.accessToken = user.accessToken;
      //   token.id = user.id;
      //   token.provider = account?.provider;
      // }
      return token;
    },
    session: ({ session, token }) => {
      console.log('session');
      console.log(session);
      // if (token) {
      //   session.id = token.id;
      //   session.provider = token.provider;
      //   session.token = token;
      // }
      return session;
    }
  },
  session: {
    strategy: 'jwt'
    // maxAge: Number(process.env.NEXT_APP_JWT_TIMEOUT!)
  },
  // jwt: {
  //   secret: process.env.NEXT_APP_JWT_SECRET
  // },
  pages: {
    signIn: '/login',
    newUser: '/register'
  }
};
