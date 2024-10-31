export function validarData(data: string): Date | null {
    const regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;

    if (!regexData.test(data)) {
        return null;
    }

    const partesData = data.split('/');
    const [dia, mes, ano] = partesData.map(Number);
    const dataConvertida = new Date(ano, mes - 1, dia);

    return dataConvertida.toString() === 'Invalid Date' ? null : dataConvertida;
}
