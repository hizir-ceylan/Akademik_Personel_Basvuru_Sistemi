export function isAuthorized(roleIdExpected) {
    const token = localStorage.getItem("token");
    if (!token) return false;
  
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.roleId === roleIdExpected;
    } catch (e) {
      return false;
    }
  }
  