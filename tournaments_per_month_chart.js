import tournaments_per_month_data from "./data/tournaments_per_month.json" assert { type: "json" };

const tournaments_per_month_x_data = Object.values(tournaments_per_month_data[0]);
const tournaments_per_month_y_data = Object.values(tournaments_per_month_data[1]);

const tournaments_per_month_chart = new Chart("tournaments_per_month_chart",
{
    type: "line",
    data:
    {
        labels: tournaments_per_month_x_data,
        datasets: 
        [
            {
                label: "Tournaments",
                data: tournaments_per_month_y_data,
                fill: false,
                borderColor: "rgb(0, 0, 255)",
                backgroundColor: "rgb(0, 0, 255)"
            }
        ]
    },
    options:
    {
        animation: false,
        plugins:
        {
            legend:
            {
                display: false
            },
            title:
            {
                display: true,
                text: "The Number of Tournaments Each Month"
            }
        },
        scales:
        {
            x:
            {
                title:
                {
                    display: true,
                    align: "center",
                    text: "Month"
                }
            },
            y:
            {
                
                title:
                {
                    display: true,
                    align: "center",
                    text: "Number of Tournaments"
                },
                min: 0,
                max: 6000
            }
        }
    }
});