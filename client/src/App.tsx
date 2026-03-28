import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch, Redirect } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Browse from "./pages/Browse";
import ResourceDetail from "./pages/ResourceDetail";
import Crisis from "./pages/Crisis";
import About from "./pages/About";
import Submit from "./pages/Submit";
import Admin from "./pages/Admin";
import Contact from "./pages/Contact";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/browse" component={Browse} />
      {/* Legacy routes redirect to unified browse page */}
      <Route path="/categories">{() => <Redirect to="/browse" />}</Route>
      <Route path="/provinces">{() => <Redirect to="/browse" />}</Route>
      <Route path="/resource/:id" component={ResourceDetail} />
      <Route path="/crisis" component={Crisis} />
      <Route path="/about" component={About} />
      <Route path="/contact" component={Contact} />
      <Route path="/submit" component={Submit} />
      <Route path="/admin" component={Admin} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
