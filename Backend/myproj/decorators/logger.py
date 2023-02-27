import logging

def logger_decorator(view_func):
    def wrapper(request, *args, **kwargs):
        # create logger
        logger_name = 'myapp.views'
        logger = logging.getLogger(logger_name)

        # set log level and format
        log_level = logging.INFO
        log_format = '%(asctime)s [%(levelname)s] %(message)s'
        formatter = logging.Formatter(log_format)

        # create file handler
        log_file = './logs/django.log'
        file_handler = logging.FileHandler(log_file)
        file_handler.setLevel(log_level)
        file_handler.setFormatter(formatter)
        logger.addHandler(file_handler)

        # call view function and log result
        try:
            response = view_func(request, *args, **kwargs)
            logger.info('View function {} returned response {}'.format(view_func.__name__, response))
            return response
        except Exception as e:
            logger.exception('View function {} raised exception: {}'.format(view_func.__name__, e))
            raise
    return wrapper