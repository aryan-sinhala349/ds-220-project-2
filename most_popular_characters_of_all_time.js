import most_popular_characters_of_all_time_data from "./data/most_popular_characters_of_all_time.json" assert { type: "json" };

const most_popular_characters_of_all_time_x_data = Object.values(most_popular_characters_of_all_time_data[0]);
const most_popular_characters_of_all_time_y_data = Object.values(most_popular_characters_of_all_time_data[1]);

const most_popular_characters_of_all_time_chart = new Chart("most_popular_characters_of_all_time_chart",
{
    type: "bar",
    data:
    {
        labels: most_popular_characters_of_all_time_x_data,
        datasets: 
        [
            {
                label: "Games Reported",
                data: most_popular_characters_of_all_time_y_data,
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
                text: "Popularity of Characters"
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
                    text: "Character"
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
                max: 450000
            }
        }
    }
});