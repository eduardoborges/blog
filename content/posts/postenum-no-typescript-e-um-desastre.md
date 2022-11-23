---
title: "Enum no Typescript é um completo desastre e eu posso provar"
date: 2022-11-23T19:11:19-03:00
slug: "enum-no-typescript-e-um-desastre"
draft: false
---

Acho que você, ao criar qualquer tipo de coisa utilizando Typescript, já deve ter utilizado `enum`. Temos que admitir que quem pensou neles, estava no mínimo bêbado. Quem aprovou o PR, também.

Por exemplo, suponhamos que temos um programinha que aceita um tipo de documento brasileiro como parâmetro e temos que identifica-lo, assim:

```typescript
const doc = {
  type: "CNH",
  number: "1234567"
};
```

Daí você resolve *tipar* esse payload e você como um dev serelepe resolve usar `enum`, ficaria algo assim:

```typescript
enum DocType {
  RG,
  CPF
};
```



Ok, código formoso, código bonito. Simples. *Debugando* com console.log™️ temos:

```javascript
console.log(DocType.RG); // 0
console.log(DocType.CPF); // 1
```

Maaasss, e se resolvêssemos adicionar, mais um cara no meio desse enum?


```typescript
enum DocType {
  RG,
  PASSPORT,
  CPF
};
console.log(DocType.RG); // 0
console.log(DocType.CPF); // 2
```

O CPF já deixou de ter o mesmo valor, isso literalmente *fode* com a manutenibilidade e etc e tal. Ai você curioso que é, resolve dar um log para saber o que raios tem nesse enum e temos o seguinte resultado;


```javascript
console.log(DocType);
// { '0': 'RG', '1': 'PASSPORT', '2': 'CPF', RG: 0, PASSPORT: 1, CPF: 2 }
```

Ér... deixo os comentários com vocês, amigos. 🤧



