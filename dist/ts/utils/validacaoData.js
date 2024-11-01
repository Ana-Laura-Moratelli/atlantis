"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validarData = void 0;
function validarData(data) {
    var regexData = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/(19|20)\d{2}$/;
    if (!regexData.test(data)) {
        return null;
    }
    var partesData = data.split('/');
    var _a = partesData.map(Number), dia = _a[0], mes = _a[1], ano = _a[2];
    var dataConvertida = new Date(ano, mes - 1, dia);
    return dataConvertida.toString() === 'Invalid Date' ? null : dataConvertida;
}
exports.validarData = validarData;
