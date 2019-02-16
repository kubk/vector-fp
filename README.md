CodeSandbox демо: [https://codesandbox.io/s/github/kubk/vector-fp/tree/build](https://codesandbox.io/s/github/kubk/vector-fp/tree/build)

- `npm i`
- `npx ts-node index.ts`
- `npx prettier index.ts --write --single-quote`

Упражнение ([Оригинал](https://phpbooktest2.ga/l1/pasta.html)):

В большой международной перспективной компании «Вектор» есть 4 департамента: департамент закупок, продаж, рекламы и логистики. В этих 4 департаментах работают менджеры (ме), маркетологи (ма), инженеры (ин) и аналитики (ан).

Менеджер получает 500 тугриков в месяц, выпивает 20 литров кофе и производит 200 страниц отчетов в месяц

Маркетолог — 400 тугриков, 15 литров кофе и 150 страниц отчетов

Инженер — 200 тугриков, 5 литров кофе и 50 страниц чертежей

Аналитик — 800 тугриков и 50 литров кофе и 5 страниц стратегических исследований

Кроме того, все сотрудники бывают 3 рангов: первого, второго и третьего. Сотрудник второго ранга получает на 25% больше, чем первого, а сотрудник 3-го ранга - на 50% больше, чем первого.
Вот состав департаментов:
```
Департамент закупок: 9×ме1, 3×ме2, 2×ме3, 2×ма1 + руководитель департамента ме2
Департамент продаж: 12×ме1, 6×ма1, 3×ан1, 2×ан2 + руководитель ма2
Департамент рекламы: 15×ма1, 10×ма2, 8×ме1, 2×ин1 + руководитель ма3
Департамент логистики: 13×ме1, 5×ме2, 5×ин1 + руководитель ме1
```
Руководитель получает на 50% больше, чем обычный сотрудник того же уровня, пьет в 2 раза больше кофе, и не производит отчетов, чертежей или стратегических исследований. Задание: напиши программу для учета расходов и результатов работы всего дружного коллектива компании «Вектор». Программа должна вывести:
- Число сотрудников в каждом департаменте
- Расходы на зарплату и на кофе по каждому департаменту и в сумме
- Число страниц документов и отчетов, которые производят каждый департамент и в сумме
- Посчитать средний расход тугриков на одну страницу

Программа должна быть сделана так, чтобы исходные данные о сотрудниках можно было легко поменять. Должна быть возможность добавлять новые профессии, не меняя старые классы.

Антикризисные меры:
- Сократить в каждом департаменте 40% (округляя в большую сторону) инженеров, преимущественно самого низкого ранга. Если инженер является боссом, вместо него надо уволить другого инженера, не босса.
- Увеличить в целях стимуляции умственной деятельности базовую ставку аналитика с 800 до 1100 тугриков, а количество выпиваемого им кофе с 50 до 75 литров. В тех департаментах, где руководитель не является аналитиком, заменить его на аналитика самого высшего ранга из этого департамента (а бывшего руководителя вернуть к обычной работе)
- В каждом департаменте повысить 50% (округляя в большую сторону) менеджеров 1-го и 2-го ранга на один ранг с целью расширить их полномочия.

Совет директоров в затруднении: какой путь выбрать? Помоги им с этим, распечатав прогноз по потреблению и расходам (аналогичный тому что требуется в первой части задачи) после принятия каждой из мер.
