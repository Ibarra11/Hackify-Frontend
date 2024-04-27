import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import { ThemeProvider } from './components/theme-provider';
import HomePage from './components/home';
import LoginForm from './components/login';
import SignUpForm from './components/signup';
import { Toaster } from "@/components/ui/sonner"

function App() {
  const location = useLocation();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="hackify-theme">
      <Routes>
        <Route index element={<HomePage />}></Route>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />

        {/* <Route index element={<SignIn />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/resume/editor" element={<ResumeBuilder />} /> */}
      </Routes>
      <Toaster position='top-center' richColors/>
    </ThemeProvider>
  )
}

export default App
