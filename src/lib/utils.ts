import { BackendRoutes } from "@/routes";

const baseURL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8020/api/v1";

export function googleOneTapForm(cred: string) {
  const form = document.createElement("form");
  form.method = "POST";
  form.action = `${baseURL}${BackendRoutes.GOOGLE_ONE_TAP}`;

  const credentialInput = document.createElement("input");
  credentialInput.type = "hidden";
  credentialInput.name = "credential";
  credentialInput.value = cred;

  const redirectInput = document.createElement("input");
  redirectInput.type = "hidden";
  redirectInput.name = "should_redirect";
  redirectInput.value = "true";

  form.appendChild(credentialInput);
  form.appendChild(redirectInput);
  document.body.appendChild(form);
  form.submit();
}
