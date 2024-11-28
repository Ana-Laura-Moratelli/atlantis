type Cliente = {
    id: number;
    nome: string;
    nomeSocial: string;
    dataNascimento: string;
    telefones: { ddd: string; numero: string }[];
    endereco: { rua: string; bairro: string; cidade: string; estado: string; pais: string; codigoPostal: string };
    documentos: { numero: string; tipo: string; dataExpedicao: string }[];
  };

  export default Cliente