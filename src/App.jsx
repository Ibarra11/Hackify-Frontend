import { Routes, Route, useLocation } from 'react-router-dom';
import './App.css'
import { ThemeProvider } from './components/theme-provider';
import { Button } from './components/ui/button';

function App() {
  const location = useLocation();

  return (
    <ThemeProvider defaultTheme="dark" storageKey="hackify-theme">
      <Routes>
        <Route index element={<div>Please sign in <Button>Sign in</Button></div>}></Route>
        {/* <Route index element={<SignIn />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/resume/editor" element={<ResumeBuilder />} /> */}
      </Routes>
    </ThemeProvider>
  )
}

export default App
