import { useState, useEffect, FormEvent, ChangeEvent, FocusEvent } from 'react';
import axios from 'axios';
import NavBar from '../../../components/navbar';
import Swal from 'sweetalert2';
import MaskedTextField from '../../../components/masked';
import { useForm, Controller } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import Documento from '../../../types/documento';

function AtualizarTitular() {
    const { control } = useForm();
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [nome, setNome] = useState('');
    const [nomeSocial, setnomeSocial] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [documentos, setDocumentos] = useState<Documento[]>([{ tipo: '', numero: '', dataExpedicao: '' }]);
    const [telefones, setTelefones] = useState([{ ddd: '', numero: '' }]);
    const [endereco, setEndereco] = useState({
        rua: '',
        bairro: '',
        cidade: '',
        estado: '',
        pais: '',
        codigoPostal: ''
    });

    useEffect(() => {
        const fetchTitular = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/listar-titular/${id}`);
                const { nome, nomeSocial, dataNascimento, telefones = [], endereco = {}, documentos = [] } = response.data;

                setNome(nome);
                setnomeSocial(nomeSocial);
                setDataNascimento(dataNascimento);

                setTelefones(telefones && telefones.length > 0 ? telefones : [{ ddd: '', numero: '' }]);
                setEndereco(endereco || {
                    rua: '',
                    bairro: '',
                    cidade: '',
                    estado: '',
                    pais: '',
                    codigoPostal: ''
                });
                setDocumentos(documentos && documentos.length > 0 ? documentos : [{ tipo: '', numero: '', dataExpedicao: '' }]);
            } catch (error) {
                console.error('Erro ao carregar titular:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro ao carregar titular',
                    confirmButtonColor: '#3871C1',
                });
            }
        };

        fetchTitular();
    }, [id]);

    const handleUpdate = async (e: FormEvent) => {
        e.preventDefault();

        const data = {
            nome,
            nomeSocial,
            dataNascimento,
            telefones,
            endereco,
            documentos,
        };

        try {
            const response = await axios.put(`http://localhost:3000/atualizar-cliente/${id}`, data);
            Swal.fire({
                icon: 'success',
                title: 'Atualizado com sucesso!',
                text: response.data.message,
                confirmButtonColor: '#3871C1',
            });
        } catch (error) {
            console.error('Erro ao atualizar cliente:', error);

            if (axios.isAxiosError(error)) {
                const { status, data } = error.response || {};

                if (status === 400 && data?.message === 'Documentos duplicados encontrados') {
                    const documentosDuplicados = data.documentosDuplicados || [];

                    Swal.fire({
                        icon: 'warning',
                        title: 'Documentos duplicados',
                        html: `
                            <p>Não é possível atualizar. Os seguintes documentos já estão cadastrados:</p>
                            <ul>
                                ${documentosDuplicados
                                .map((doc: string) => `<li>${doc}</li>`)
                                .join('')}
                            </ul>
                        `,
                        confirmButtonText: 'OK',
                        confirmButtonColor: '#3871C1',
                    });
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Erro ao atualizar cliente.',
                        confirmButtonColor: '#3871C1',
                    });
                }
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Erro inesperado ao atualizar cliente.',
                    confirmButtonColor: '#3871C1',
                });
            }
        }
    };


    const handleTelefoneChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        let cleanedValue = value.replace(/\D/g, '');

        const newTelefones = [...telefones];

        if (name === 'ddd') {

            cleanedValue = cleanedValue.substring(0, 2);
            newTelefones[index].ddd = cleanedValue;
        } else if (name === 'numero') {

            cleanedValue = cleanedValue.substring(0, 9);

            if (cleanedValue.length <= 8) {
                cleanedValue = cleanedValue.replace(/(\d{0,4})(\d{0,4})/, (_match, p1, p2) => {
                    return p2 ? `${p1}-${p2}` : p1;
                });
            } else {
                cleanedValue = cleanedValue.replace(/(\d{0,5})(\d{0,4})/, (_match, p1, p2) => {
                    return `${p1}-${p2}`;
                });
            }

            newTelefones[index].numero = cleanedValue;
        }

        setTelefones(newTelefones);
    };


    const validateTelefone = (index: number, e: FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;
        const regexTelefone = /^(\d{4}-\d{4}|\d{5}-\d{4})$/;

        if (!regexTelefone.test(value)) {
            Swal.fire({
                icon: 'warning',
                title: 'Formato de telefone inválido!',
                text: 'O telefone deve estar no formato 9999-9999 ou 99999-9999.',
                confirmButtonColor: '#3871C1',
            });
            const newTelefones = [...telefones];
            newTelefones[index].numero = '';
            setTelefones(newTelefones);
        }
    };

    const addTelefone = () => {
        setTelefones([...telefones, { ddd: '', numero: '' }]);
    };

    const handleCodigoPostalChange = (e: ChangeEvent<HTMLInputElement>) => {
        let { value } = e.target;

        value = value.replace(/\D/g, '');

        value = value.substring(0, 8);

        if (value.length > 5) {

            value = value.replace(/(\d{5})(\d{0,3})/, (_match, p1, p2) => {
                return `${p1}-${p2}`;
            });
        }

        setEndereco((prev) => ({ ...prev, codigoPostal: value }));
    };


    const validateCodigoPostal = (e: FocusEvent<HTMLInputElement>) => {
        const { value } = e.target;

        const regexCodigoPostal = /^\d{5}-\d{3}$/;

        if (!regexCodigoPostal.test(value)) {
            Swal.fire({
                icon: 'warning',
                title: 'Formato de Código Postal inválido!',
                text: 'O Código Postal deve ter 8 dígitos.',
                confirmButtonColor: '#3871C1',
            });

            setEndereco((prev) => ({ ...prev, codigoPostal: '' }));
        }
    };

    const handleDataNascimentoChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDataNascimento(e.target.value);
    };

    const handleDataNascimentoBlur = () => {
        const selectedDate = new Date(dataNascimento);

        if (isNaN(selectedDate.getTime())) {
            Swal.fire({
                icon: 'warning',
                title: 'Data Inválida!',
                text: 'Por favor, insira uma data válida.',
                confirmButtonColor: '#3871C1',
            });
            setDataNascimento('');
            return;
        }

        const currentDate = new Date();
        const minDate = new Date('1900-01-01');

        if (selectedDate < minDate || selectedDate > currentDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Data Inválida!',
                text: 'A data de nascimento deve estar entre 01/01/1900 e a data atual.',
                confirmButtonColor: '#3871C1',
            });
            setDataNascimento('');
        }
    };

    const handleEnderecoChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEndereco((prev) => ({ ...prev, [name]: value }));
    };

    const handleDocumentoChange = (
        index: number,
        e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setDocumentos((prev) =>
            prev.map((doc, i) =>
                i === index ? { ...doc, [name]: value } : doc
            )
        );
    };


    const handleDataExpedicaoBlur = (index: number) => {
        const dataExpedicao = documentos[index].dataExpedicao;

        const datePattern = /^\d{4}-\d{2}-\d{2}$/;
        if (!datePattern.test(dataExpedicao)) {
            Swal.fire({
                icon: 'warning',
                title: 'Data Inválida!',
                text: 'Por favor, insira uma data válida no formato AAAA-MM-DD.',
                confirmButtonColor: '#3871C1',
            });

            setDocumentos((prev) =>
                prev.map((doc, i) =>
                    i === index ? { ...doc, dataExpedicao: '' } : doc
                )
            );
            return;
        }

        const selectedDate = new Date(dataExpedicao);

        if (isNaN(selectedDate.getTime())) {
            Swal.fire({
                icon: 'warning',
                title: 'Data Inválida!',
                text: 'Por favor, insira uma data válida.',
                confirmButtonColor: '#3871C1',
            });

            setDocumentos((prev) =>
                prev.map((doc, i) =>
                    i === index ? { ...doc, dataExpedicao: '' } : doc
                )
            );
            return;
        }

        const currentDate = new Date();
        const minDate = new Date('1900-01-01');

        if (selectedDate < minDate || selectedDate > currentDate) {
            Swal.fire({
                icon: 'warning',
                title: 'Data Inválida!',
                text: 'A data de expedição deve estar entre 01/01/1900 e a data atual.',
                confirmButtonColor: '#3871C1',
            });

            setDocumentos((prev) =>
                prev.map((doc, i) =>
                    i === index ? { ...doc, dataExpedicao: '' } : doc
                )
            );
        }
    };


    const addDocumento = () => {
        setDocumentos([...documentos, { tipo: '', numero: '', dataExpedicao: '' }]);
    };

    const validateDDD = (index: number) => {
        const { ddd } = telefones[index];
        if (!/^\d{2}$/.test(ddd)) {
            Swal.fire({
                icon: 'warning',
                title: 'DDD Inválido',
                text: 'O DDD deve conter exatamente 2 dígitos numéricos.',
                confirmButtonText: 'OK',
                confirmButtonColor: '#3871C1',
            });
            const newTelefones = [...telefones];
            newTelefones[index].ddd = '';
            setTelefones(newTelefones);
        }
    };

    const getMask = (tipo: "RG" | "CPF" | "Passaporte"): (string | RegExp)[] => {
        switch (tipo) {
            case "RG":
                return [/\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/];
            case "CPF":
                return [/\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, ".", /\d/, /\d/, /\d/, "-", /\d/, /\d/];
            case "Passaporte":
                return [/[A-Za-z]/, /[A-Za-z]/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
        }
    };


    const handleDocumentoBlur = (
        numero: string,
        tipo: "RG" | "CPF" | "Passaporte",
        index: number,
        onChange: (value: string) => void
    ) => {
        const rgRegex = /^\d{2}\.\d{3}\.\d{3}-\d{1}$/;
        const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
        const passaporteRegex = /^[A-Z]{2}\d{6}$/;

        let isValid = true;

        if (tipo === "RG" && !rgRegex.test(numero)) {
            isValid = false;
        } else if (tipo === "CPF" && !cpfRegex.test(numero)) {
            isValid = false;
        } else if (tipo === "Passaporte" && !passaporteRegex.test(numero)) {
            isValid = false;
        }

        if (!isValid) {
            Swal.fire({
                icon: "warning",
                title: "Número de Documento Inválido!",
                text: `O formato do número do documento para ${tipo} está incorreto.`,
                confirmButtonColor: "#3871C1",
            });

            setDocumentos((prevDocumentos) =>
                prevDocumentos.map((doc, i) =>
                    i === index ? { ...doc, numero: "" } : doc
                )
            );
            onChange(""); 
        }
    };




    const removeTelefone = (indexToRemove: number) => {
        setTelefones((prevTelefones) =>
            prevTelefones.filter((_, index) => index !== indexToRemove)
        );
    };

    const removeDocumento = (indexToRemove: number) => {
        setDocumentos((prevDocumentos) =>
            prevDocumentos.filter((_, index) => index !== indexToRemove)
        );
    };


    return (
        <>
            <NavBar />
            <div className="flex flex-wrap items-center justify-between mx-auto p-4">
                <h1 className="text-3xl font-bold">Atualizar Dependente</h1>
                <button
                    className="text-white bg-blue-500 hover:bg-blue-600 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => navigate('/listagemDependente')}
                >
                    Voltar
                </button>
            </div>
            <form className="p-4" onSubmit={handleUpdate}>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                            placeholder=" "
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nome
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            value={nomeSocial}
                            onChange={(e) => setnomeSocial(e.target.value)}
                            placeholder=" "
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Nome Social
                        </label>
                    </div>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="date"
                        value={dataNascimento
                            ? new Date(dataNascimento).toISOString().split('T')[0]
                            : ''}
                        onChange={handleDataNascimentoChange}
                        onBlur={handleDataNascimentoBlur}

                        placeholder=" "
                        required
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                    />
                    <label
                        htmlFor="floating_birthdate"
                        className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        Data de Nascimento
                    </label>
                </div>

                <h2 className="text-left text-3xl font-bold pt-4 pb-4">Telefones</h2>
                {telefones.map((telefone, index) => (
                    <div key={index} className="grid md:grid-cols-2 md:gap-6">
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="number"
                                name="ddd"
                                value={telefone.ddd}
                                onChange={(e) => handleTelefoneChange(index, e)}
                                onBlur={() => validateDDD(index)}
                                placeholder=" "
                                required
                                maxLength={2}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                DDD
                            </label>
                        </div>
                        <div className="relative z-0 w-full mb-5 group">
                            <input
                                type="text"
                                name="numero"
                                value={telefone.numero}
                                onChange={(e) => handleTelefoneChange(index, e)}
                                onBlur={(e) => validateTelefone(index, e)}
                                placeholder=" "
                                required
                                maxLength={10}
                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                            />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                Telefone
                            </label>
                        </div>
                    </div>
                ))}

                <div className="flex gap-4 mb-4">
                    <button
                        type="button"
                        onClick={addTelefone}
                        className="text-blue-500 underline"
                    >
                        + Adicionar Telefone
                    </button>
                    {telefones.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeTelefone(telefones.length - 1)} 
                            className="text-red-500 underline"
                        >
                            Remover Telefone
                        </button>
                    )}
                </div>
                <h2 className="text-left text-3xl font-bold pt-4 pb-4">Endereço</h2>
                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="rua"
                            value={endereco.rua}
                            onChange={handleEnderecoChange}
                            placeholder=" "
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Rua
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="bairro"
                            value={endereco.bairro}
                            onChange={handleEnderecoChange}
                            placeholder=" "
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Bairro
                        </label>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="cidade"
                            value={endereco.cidade}
                            onChange={handleEnderecoChange}
                            placeholder=" "
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Cidade
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="estado"
                            value={endereco.estado}
                            onChange={handleEnderecoChange}
                            placeholder=" "
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Estado
                        </label>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 md:gap-6">
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="pais"
                            value={endereco.pais}
                            onChange={handleEnderecoChange}
                            placeholder=" "
                            required
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            País
                        </label>
                    </div>
                    <div className="relative z-0 w-full mb-5 group">
                        <input
                            type="text"
                            name="codigoPostal"
                            value={endereco.codigoPostal}
                            onChange={handleCodigoPostalChange}
                            onBlur={validateCodigoPostal}
                            placeholder=" "
                            required
                            maxLength={9}
                            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        />
                        <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                            Código Postal
                        </label>
                    </div>
                </div>

                <h2 className="text-left text-3xl font-bold pt-4 pb-4">Documento</h2>
                {documentos.map((documento, index) => (
                    <div key={index} className="relative">
                        <div className="grid md:grid-cols-1 md:gap-6">
                            <div className="relative z-0 w-full group">
                                <select
                                    id={`tipo-${index}`}
                                    name="tipo"
                                    value={documento.tipo}
                                    onChange={(e) => handleDocumentoChange(index, e)}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 mb-5"
                                    required
                                >
                                    <option value="">Selecione o tipo de documento</option>
                                    <option value="RG">RG</option>
                                    <option value="CPF">CPF</option>
                                    <option value="Passaporte">Passaporte</option>
                                </select>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 md:gap-6">
                            <div className="relative z-0 w-full mb-5 group">
                                <Controller
                                    name={`documento-${index}`}
                                    control={control}
                                    render={({ field: { onChange, onBlur, value } }) => {
                                        const validTipo =
                                            documento.tipo === "RG" ||
                                                documento.tipo === "CPF" ||
                                                documento.tipo === "Passaporte"
                                                ? documento.tipo
                                                : null;

                                        return (
                                            <MaskedTextField
                                                name="numero" 
                                                mask={validTipo ? getMask(validTipo) : []} 
                                                value={documentos[index]?.numero || ""} 
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                                    let newValue = e.target.value;

                                                    if (validTipo === "Passaporte") {
                                                        newValue = newValue.toUpperCase();
                                                    }

                                                    onChange(newValue); 
                                                    handleDocumentoChange(index, e);
                                                }}
                                                onBlur={() => {
                                                    onBlur();
                                                    if (validTipo) {
                                                        handleDocumentoBlur(
                                                            value || "",
                                                            validTipo,
                                                            index,
                                                            onChange 
                                                        );
                                                    }
                                                }}
                                                placeholder=" "
                                                className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 
                           border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 
                           dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                            />
                                        );
                                    }}
                                />
                                <label htmlFor={`numero-${index}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Número do Documento
                                </label>
                            </div>

                            <div className="relative z-0 w-full mb-5 group">
                                <input
                                    type="date"
                                    name="dataExpedicao"
                                    value={documento.dataExpedicao
                                        ? new Date(documento.dataExpedicao).toISOString().split('T')[0]
                                        : ''}
                                    onChange={(e) => handleDocumentoChange(index, e)}
                                    onBlur={() => handleDataExpedicaoBlur(index)}
                                    required
                                    className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                />
                                <label htmlFor={`dataExpedicao-${index}`} className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                                    Data de Expedição
                                </label>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="flex gap-4 mb-4">
                    <button
                        type="button"
                        onClick={addDocumento}
                        className="text-blue-500 underline"
                    >
                        + Adicionar Documento
                    </button>
                    {documentos.length > 1 && (
                        <button
                            type="button"
                            onClick={() => removeDocumento(documentos.length - 1)} 
                            className="text-red-500 underline"
                        >
                            Remover Documento
                        </button>
                    )}
                </div>
                <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                    Atualizar
                </button>
            </form>
        </>
    );
}

export default AtualizarTitular;
