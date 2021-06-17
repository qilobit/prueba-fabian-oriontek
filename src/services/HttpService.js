const API_URL = 'https://us-central1-prueba-fabian-oriontek.cloudfunctions.net/api';
class HttpService{
  
  static async get(url){
    try {
      const res = await fetch(`${API_URL}/${url}`);
      return res.json();
    } catch (error) {
      return {
        ok: false,
        message: error.message
      };
    }
  }


  static async post(url, data){
    try {
      const res = await fetch(`${API_URL}/${url}`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return res.json();
    } catch (error) {
      return {
        ok: false,
        message: error.message
      };
    }
  }

  static async delete(url){
    try {
      const res = await fetch(`${API_URL}/${url}`, {method: 'DELETE'});
      return res.json();
    } catch (error) {
      return {
        ok: false,
        message: error.message
      };
    }
  }

}
module.exports = HttpService;