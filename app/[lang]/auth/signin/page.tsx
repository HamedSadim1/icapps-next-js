import CustomLoginPage from "@/app/[lang]/components/CustomLoginPage";

const LoginPage = ({params: { lang}} : { params: { lang: string }}) => {
  return <CustomLoginPage lang={lang}/>;
};

export default LoginPage;

