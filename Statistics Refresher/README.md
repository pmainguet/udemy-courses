# Statistics for Business Analytics and Data Science A-Z

Link: https://www.udemy.com/data-statistics
Markdown formula: https://goessner.github.io/markdown-it-texmath/index.html

## Distributions

* Continuous variable: data that can take any value (amount of money, ...)
* Discrete variable: data that can take only specific values(categories, age, ...)

### What is a distribution

* Probability Distribution: mathematical function that can be thought of as providing the probability of occurence of different possible outcomes in an experiment (ie: picking a random variable in our dataset)
* Discrete Variable - Distribution curves (bar chart) gives the probability of having someone aged xx for ex
* Continous Variable - Cannot tell the probability of a specific value is as it is always zero, but you can tell the probability of being in a range through integration (the probability function is called Probability Density Function (PDF) )

### What is standard deviation

* Mean: average value that takes the data, value where the data is centered
* Variance / Std Dev: measure of the Spread of the data
    * Range: min and max
    * Variance: average of deviation to the mean $\mu$           
        $Var = \sigma² = \frac {(\sum_{i=1}^N x_i - \mu)² } {N}$
        (the fact that we use square instead of module is because it creates problem with more advanced calculus)
    * Standard Deviation : square root of variance, better than variance as it has the same unit as data (can add standard deviation to mean)
        $Std Dev = \sigma = \sqrt {Var} = \sqrt {\frac {(\sum_{i=1}^N x_i - \mu)² } {N}}$


### Normal Distribution

* $p(x) = \frac {1} {\sigma \sqrt{2\pi}}\epsilon^(-\frac{(x-\mu)^2}{2\sigma^2})$
* For a normal distribution, the probability of falling:
    * between $\mu$ and $\mu + \sigma$ is 34.1% (same for between $\mu$ and $\mu - \sigma$ )
    * between $\mu + \sigma$ and $\mu + 2\sigma$ is 13.6% (same for between $\mu - \sigma$ and $\mu - 2\sigma$ )
    * between $\mu + 2\sigma$ and $\mu + 3\sigma$ is 2.1% (same for between $\mu - 2\sigma$ and $\mu - 3\sigma$ )
    * above $\mu + 3\sigma$ is 0.1% (same for below $\mu - 3sigma$)

### Skewness

### Mean, Median, Mode

### Cantor's Diagonal Argument

## Central Limit Theorem

## Hypothesis Testing / Statistical Significance

## Advanced Hypothesis Testing

## Vitaly Dolgov's