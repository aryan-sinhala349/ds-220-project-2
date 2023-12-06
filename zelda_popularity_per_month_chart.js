import zelda_popularity_per_month_data from "./data/zelda_win_rate_per_month.json" assert { type: "json" };

const zelda_popularity_per_month_x_data = Object.values(zelda_popularity_per_month_data[0]);
const zelda_popularity_per_month_y_data = Object.values(zelda_popularity_per_month_data[2]);

const zelda_popularity_per_month_chart = new Chart("zelda_popularity_per_month_chart",
{
    type: "line",
    data:
    {
        labels: zelda_popularity_per_month_x_data,
        datasets: 
        [
            {
                label: "Games Reported",
                data: zelda_popularity_per_month_y_data,
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
                text: "Zelda's Popularity Each Month"
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
                },
                ticks:
                {
                    autoSkip: false,
                    maxRotation: 90,
                    minRotation: 90
                }
            },
            y:
            {
                
                title:
                {
                    display: true,
                    align: "center",
                    text: "Games Reported"
                },
                min: 0,
                max: 10000
            }
        }
    }
});