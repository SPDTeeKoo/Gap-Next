'use client';

import { useState, ReactNode, useEffect } from 'react';
import { useForm, SubmitHandler, FieldValues } from 'react-hook-form';

// NEXT
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// validation rule
import { validationRules } from './_lib/validationRule';

// MATERIAL - UI
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import Radio from '@mui/material/Radio';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';

// THIRD - PARTY
import OtpInput from 'react18-input-otp';

// PROJECT IMPORTS
import AuthCard from 'sections/auth/AuthCard';
import Logo from 'components/logo';
import useUser from 'hooks/useUser';
import AuthSocButton from 'sections/auth/AuthSocButton';
import AuthWrapper3 from 'sections/auth/AuthWrapper3';

// ASSETS
import { User, Home3 } from 'iconsax-react';
const imgSms = '/assets/images/auth/sms.svg';
const imgSmsLight = '/assets/images/auth/smsLight.svg';
const imgFacebook = '/assets/images/auth/facebook.svg';
const imgTwitter = '/assets/images/auth/twitter.svg';
const imgGoogle = '/assets/images/auth/google.svg';

// TYPES
import { ThemeMode } from 'types/config';
import useUserRegisterMutation from './register/_services/registration';
import toast from 'react-hot-toast';
import { red } from '@mui/material/colors';
import useProfileMutation from 'sections/apps/_hooks/profileUseMutation';
import useCompanyProfileMutation from 'sections/apps/_hooks/createComanyMutation';
import { Router } from 'next/router';

const steps = ['1', '2', '3', '4', '5'];

interface StepWrapperProps {
  children?: ReactNode;
  index: number;
  value: number;
}

interface RegistraionData {
  Cname: string;
  FirstName: string;
  LastName: string;
  email: string;
  Password: string;
  CPassword: string;
}

function StepWrapper({ children, value, index, ...other }: StepWrapperProps) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ py: 3 }}>{children}</Box>}
    </div>
  );
}

// ================================|| LOGIN ||================================ //

const Login3Page = () => {
  const theme = useTheme();
  const user = useUser();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());
  const [selectedValue, setSelectedValue] = useState('Individual');
  const [otp, setOtp] = useState<string>();
  const [workEmail, setWorkEmail] = useState('');
  const router = useRouter();

  const borderColor = theme.palette.mode === ThemeMode.DARK ? theme.palette.secondary[200] : theme.palette.secondary.light;

  const isStepSkipped = (step: number) => skipped.has(step);

  // useForm
  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm();

  const successHandler = () => {
    toast.success('Successfully Register!');
  };

  const errorHandler = (error: any) => {
    toast.error('Failed!');
  };

  const profileSuccessHandler = () => {
    toast.success('Profile Created!');
  };
  const profileErrorHandler = () => {
    toast.error('Profile failed!');
  };
  const CompanyProfileSuccessHandler = () => {
    toast.success('Profile Created!');
  };
  const CompanyprofileErrorHandler = () => {
    toast.error('Profile failed!');
  };
  // creating register
  const NewUserRequest = useUserRegisterMutation(successHandler, errorHandler);
  // creating new profile
  // const newProfileRequest = useProfileMutation(profileSuccessHandler, profileErrorHandler);
  // creating company profile
  // const newCompanyProfle = useCompanyProfileMutation(CompanyProfileSuccessHandler, CompanyprofileErrorHandler);

  const onSubmit: SubmitHandler<RegistraionData> = async (data) => {
    try {
      // Handle form submission logic here
      const dataFomate = {
        // username: data.FirstName + "" + data.LastName,
        username: data.email,
        firstname: data.FirstName,
        lastname: data.LastName,
        email: data.email,
        password: data.Password,
        company: selectedValue === 'Company' ? data.Cname : null, // Conditionally include company
        role: 'Public',
        Type: selectedValue
      };

      // Step 1: Register the user
      const userData = NewUserRequest.mutateAsync(dataFomate);

      // Extract and store user ID
      const user = (await userData)?.data.user;

      // Step 2: Create company profile if the user is company-based

      // if (selectedValue === 'Company') {
      //   const companyData = {
      //     data: {
      //       CompanyName: data.Cname
      //     }
      //   };

      //   // Use onSuccess callback to handle the next step after successful company profile creation
      //   const companyProfileData = newCompanyProfle.mutateAsync(companyData, {
      //     onSuccess: (companyUser) => {
      //       const companyUserid = companyUser?.data?.data?.id;

      //       // Step 3: Create user profile
      //       const profileData = {
      //         data: {
      //           FirstName: user.firstname,
      //           LastName: user.lastname,
      //           users_permissions_user: user.id,
      //           user_company_profile: companyUserid
      //         }
      //       };

      //       // Make sure the user profile request is completed before moving to the next step
      //       newProfileRequest.mutateAsync(profileData);
      //     }
      //   });
      // }

      // if (selectedValue === 'Individual') {
      //   // Step 4: Create user profile for individual user
      //   const profileData = {
      //     data: {
      //       FirstName: user.firstname,
      //       LastName: user.lastname,
      //       users_permissions_user: user.id
      //     }
      //   };

      //   // Make sure the user profile request is completed before moving to the next step
      //   await newProfileRequest.mutateAsync(profileData);
      // }

      // Step 5: Call your API, dispatch an action, etc.
      handleNext();
    } catch (error) {
      console.error('An error occurred:', error);
      // Handle errors accordingly
    }
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      console.log('newSkipped:');
      console.log(newSkipped);
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);

    // Check if the OTP is '1234'
    if (otp === '123456') {
      toast.success('OTP verified!!');
      // Redirect to the profile page
      router.push('/apps/profiles/user/personal');
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedValue(event.target.value);
  };
  return (
    <AuthWrapper3>
      <Grid container spacing={3} sx={{ minHeight: '100%', alignContent: 'space-between' }}>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Logo />
            {/* <Typography variant="h5" sx={{ fontWeight: 500, color: theme.palette.text.secondary }}>
              Step
              <Typography
                variant="h5"
                sx={{ fontWeight: 600, color: theme.palette.text.primary, display: 'inline-block', margin: '0 5px' }}
              >
                {activeStep + 1}
              </Typography>
              to {steps.length}
            </Typography> */}
          </Stack>
        </Grid>
        <Grid item xs={12} sx={{ '& > div': { margin: '24px auto' } }}>
          <AuthCard border={false}>
            {activeStep === steps.length ? (
              <>
                <Alert sx={{ my: 3 }}>All steps completed - you can now Login</Alert>
                <Button component={Link} href={user ? '/auth/login' : '/login'} color="primary" variant="contained" fullWidth>
                  Login
                </Button>
              </>
            ) : (
              <>
                {/* <StepWrapper value={activeStep} index={0}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <Typography variant="h3">Welcome to the Able Pro</Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Typography>Sign up or login with your work email.</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={1}>
                        <Grid item xs={12}>
                          <AuthSocButton onClick={handleNext}>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Image src={theme.palette.mode === ThemeMode.DARK ? imgSmsLight : imgSms} alt="SMS" width={16} height={16} />
                              <Typography>Continue with work email</Typography>
                            </Stack>
                          </AuthSocButton>
                        </Grid>
                        <Grid item xs={12}>
                          <AuthSocButton>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Image src={imgFacebook} alt="Facebook" width={16} height={16} />
                              <Typography>Sign In with Facebook</Typography>
                            </Stack>
                          </AuthSocButton>
                        </Grid>
                        <Grid item xs={12}>
                          <AuthSocButton>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Image src={imgTwitter} alt="Twitter" width={16} height={16} />
                              <Typography>Sign In with Twitter</Typography>
                            </Stack>
                          </AuthSocButton>
                        </Grid>
                        <Grid item xs={12}>
                          <AuthSocButton>
                            <Stack direction="row" alignItems="center" spacing={1}>
                              <Image src={imgGoogle} alt="Google" width={16} height={16} />
                              <Typography>Sign In with Google</Typography>
                            </Stack>
                          </AuthSocButton>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </StepWrapper> */}
                <StepWrapper value={activeStep} index={0}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">Welcome to the Able Pro</Typography>
                        <Typography>Sign up or login with your work email.</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={3}>
                        <Stack spacing={1}>
                          <InputLabel htmlFor="email-login">Enter your work email to continue</InputLabel>
                          <OutlinedInput
                            id="email-login"
                            type="email"
                            name="email"
                            value={workEmail}
                            placeholder="Enter email address"
                            onChange={(e: any) => {
                              setWorkEmail(e.target.value);
                            }}
                            fullWidth
                          />
                        </Stack>
                        <Stack direction="row" spacing={1}>
                          <Button color="secondary" variant="outlined" onClick={handleBack} fullWidth>
                            Back
                          </Button>
                          <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                            Continue
                          </Button>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </StepWrapper>
                <StepWrapper value={activeStep} index={1}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">What’s your purpose for use Able</Typography>
                        <Typography>Your setup experience will be streamlined accordingly</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          '& .MuiFormLabel-root': {
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            height: 180,
                            width: '100%',
                            border: `1px solid ${theme.palette.divider}`,
                            borderRadius: 1
                          },
                          '& .MuiRadio-root.Mui-checked + .MuiFormLabel-root': {
                            boxShadow: `0 0 0 1px ${theme.palette.primary.main}, 0px 8px 24px rgba(27, 46, 94, 0.12)`,
                            borderColor: theme.palette.primary.main,
                            color: theme.palette.primary.main,
                            bgcolor: theme.palette.primary.lighter
                          }
                        }}
                      >
                        <Grid item sm={6}>
                          <Radio
                            id="radioPersonal"
                            checked={selectedValue === 'Individual'}
                            onChange={handleChange}
                            value="Individual"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'A' }}
                            sx={{ display: 'none' }}
                          />
                          <InputLabel htmlFor="radioPersonal" sx={{ ml: '0 !im' }}>
                            <User variant="Bulk" size={48} />
                            <Typography variant="h5" sx={{ mt: 1 }}>
                              Individual
                            </Typography>
                          </InputLabel>
                        </Grid>
                        <Grid item sm={6}>
                          <Radio
                            id="radioBusiness"
                            checked={selectedValue === 'Company'}
                            onChange={handleChange}
                            value="Company"
                            name="radio-buttons"
                            inputProps={{ 'aria-label': 'B' }}
                            sx={{ display: 'none' }}
                          />
                          <InputLabel htmlFor="radioBusiness">
                            <Home3 variant="Bulk" size={48} />
                            <Typography variant="h5" sx={{ mt: 1 }}>
                              Company
                            </Typography>
                          </InputLabel>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack direction="row" spacing={1}>
                        <Button color="secondary" variant="outlined" onClick={handleBack} fullWidth>
                          Back
                        </Button>
                        <Button onClick={handleNext} variant="contained" color="primary" fullWidth>
                          Continue
                        </Button>
                      </Stack>
                    </Grid>
                  </Grid>
                </StepWrapper>
                <StepWrapper value={activeStep} index={2}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">Tell us About Yourself</Typography>
                        <Typography>Tell us a bit about yourself</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Grid container spacing={3}>
                        <Grid item sm={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="FirstName">First name</InputLabel>
                            <OutlinedInput
                              {...register('FirstName', validationRules.FirstName)}
                              id="FirstName"
                              name="FirstName"
                              type="text"
                              placeholder="First name"
                              fullWidth
                            />
                            {errors.FirstName && <p style={{ color: 'red' }}>{errors.FirstName.message}</p>}
                          </Stack>
                        </Grid>
                        <Grid item sm={6}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="LastName">Last name</InputLabel>
                            <OutlinedInput
                              {...register('LastName', validationRules.LastName)}
                              id="LastName"
                              name="LastName"
                              type="text"
                              placeholder="Last name"
                              fullWidth
                            />
                            {errors.LastName && <p style={{ color: 'red' }}>{errors.LastName.message}</p>}
                          </Stack>
                        </Grid>
                        <Grid item sm={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="email">Email id</InputLabel>
                            <OutlinedInput
                              {...register('email', validationRules.email)}
                              id="email"
                              type="email"
                              value={workEmail}
                              name="email"
                              placeholder="Email id"
                              onChange={(e: any) => setWorkEmail(e.target.value)}
                              fullWidth
                            />
                            {errors.email && <p style={{ color: 'red' }}>{errors.email.message}</p>}
                          </Stack>
                        </Grid>
                        {selectedValue === 'Company' && (
                          <Grid item sm={12}>
                            <Stack spacing={1}>
                              <InputLabel htmlFor="Cname">Company Name</InputLabel>
                              <OutlinedInput
                                {...register('Cname', validationRules.Cname)}
                                id="Cname"
                                name="Cname"
                                type="Cname"
                                placeholder="Company Name"
                                fullWidth
                              />
                              {errors.Cname && <p style={{ color: 'red' }}>{errors.Cname.message}</p>}
                            </Stack>
                          </Grid>
                        )}

                        <Grid item sm={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="Password">Password</InputLabel>
                            <OutlinedInput
                              {...register('Password', validationRules.Password)}
                              id="Password"
                              name="Password"
                              type="password"
                              placeholder="Password"
                              fullWidth
                            />
                            {errors.Password && <p style={{ color: 'red' }}>{errors.Password.message}</p>}
                          </Stack>
                        </Grid>
                        <Grid item sm={12}>
                          <Stack spacing={1}>
                            <InputLabel htmlFor="CPassword">Confirm Password</InputLabel>
                            <OutlinedInput
                              {...register('CPassword', validationRules.CPassword)}
                              id="CPassword"
                              name="CPassword"
                              type="password"
                              placeholder="Confirm Password"
                              fullWidth
                            />
                            {errors.CPassword && <p style={{ color: 'red' }}>{errors.CPassword.message}</p>}
                          </Stack>
                        </Grid>
                        <Grid item sm={12}>
                          <Stack direction="row" spacing={1}>
                            <Button color="secondary" variant="outlined" onClick={handleBack} fullWidth>
                              Back
                            </Button>
                            <Button onClick={handleSubmit(onSubmit)} variant="contained" color="primary" fullWidth>
                              Continue
                            </Button>
                          </Stack>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </StepWrapper>
                <StepWrapper value={activeStep} index={3}>
                  <Grid container spacing={3}>
                    <Grid item xs={12} sx={{ textAlign: 'center' }}>
                      <Stack spacing={1}>
                        <Typography variant="h3">Please confirm your email id</Typography>
                        <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry of Lorem Ipsum.</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={12}>
                      <Stack spacing={3}>
                        <OtpInput
                          value={otp}
                          onChange={(otp: string) => setOtp(otp)}
                          numInputs={6}
                          containerStyle={{ justifyContent: 'space-between' }}
                          inputStyle={{
                            width: '100%',
                            margin: '8px',
                            padding: '10px',
                            border: `1px solid ${borderColor}`,
                            borderRadius: 4,
                            ':hover': {
                              borderColor: theme.palette.primary.main
                            }
                          }}
                          focusStyle={{
                            outline: 'none',
                            boxShadow: theme.customShadows.primary,
                            border: `1px solid ${theme.palette.primary.main}`
                          }}
                        />
                        <Stack direction="row" spacing={1}>
                          <Button color="secondary" variant="outlined" onClick={handleBack} fullWidth>
                            Back
                          </Button>
                          <Button
                            onClick={handleNext}
                            disabled={otp != '123456' ? true : false}
                            variant="contained"
                            color="primary"
                            fullWidth
                          >
                            Continue
                          </Button>
                        </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
                </StepWrapper>
              </>
            )}
          </AuthCard>
        </Grid>
        <Grid item xs={12}>
          <Stack direction="row" justifyContent="center" alignItems="baseline" sx={{ mb: { xs: -0.5, sm: 0.5 } }}>
            <Typography align="center">
              By signing up, you confirm to have read Able pro
              <Typography component={Link} href={'#'} sx={{ textDecoration: 'none', px: 0.5 }} color="primary">
                Privacy Policy
              </Typography>
              and agree to the
              <Typography component={Link} href={'#'} sx={{ textDecoration: 'none', pl: 0.5 }} color="primary">
                Terms of Service
              </Typography>
              .
            </Typography>
          </Stack>
        </Grid>
      </Grid>
    </AuthWrapper3>
  );
};

export default Login3Page;
